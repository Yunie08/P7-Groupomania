import { useState, useContext, useEffect } from "react";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Components
import Card from "react-bootstrap/Card";
import CardBase from "../Shared/CardBase";
import ArticleImage from "./ArticleImage";
import ProfilePic from "../Shared/ProfilePic";
import PublishedTime from "./PublishedTime";
import AuthorLink from "./AuthorLink";
import ToggleComments from "./ToggleComments";
import AddComment from "./AddComment";
import LikeButton from "./LikeButton";
import DeleteButton from "../Shared/DeleteButton";

function Article({ data, articleListEdited, setArticleListEdited }) {
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [commentsCount, setCommentsCount] = useState(data.commentsCount);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const [likedByUser, setLikedByUser] = useState();
  const { currentUser } = useContext(AuthContext);
  const [canEdit, setCanEdit] = useState(false);

  // Check if the current user can delete the article
  // (current user is author or admin)
  useEffect(() => {
    setCanEdit(currentUser.userId === data.user.id || currentUser.isAdmin);
  }, []);

  return (
    <CardBase as="article">
      <Card.Header className="bg-white border-bottom-0 d-flex">
        <ProfilePic
          src={data.user.profilePic}
          alt={`Photo de profil de ${data.user.firstname} ${data.user.lastname}`}
          type={"article"}
        />
        <div className="col d-flex flex-column justify-content-center border-bottom border-3 ms-3">
          <AuthorLink
            firstname={data.user.firstname}
            lastname={data.user.lastname}
            type={"article"}
            userId={data.user.id}
          />

          <PublishedTime inArticle createdAt={data.createdAt} className="m-0" />
        </div>
        {canEdit && (
          <DeleteButton
            componentToDelete="article"
            articleId={data.id}
            articleListEdited={articleListEdited}
            setArticleListEdited={setArticleListEdited}
          />
        )}
      </Card.Header>
      <div className="px-md-4 d-flex flex-column">
        <Card.Title as="h2" className="my-3">
          {data.title}
        </Card.Title>
        {data?.image && <ArticleImage title={data.title} source={data.image} />}

        <Card.Text className="border-bottom border-3 pb-3">
          {data.content}
        </Card.Text>
      </div>
      <Card.Footer className="bg-white border-top-0 px-3 pt-3">
        <LikeButton
          articleId={data.id}
          likesCount={likesCount}
          setLikesCount={setLikesCount}
          likedByUser={likedByUser}
          setLikedByUser={setLikedByUser}
        />
        <ToggleComments
          articleId={data.id}
          commentRefresh={commentRefresh}
          setCommentRefresh={setCommentRefresh}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
        <AddComment
          articleId={data.id}
          commentRefresh={commentRefresh}
          setCommentRefresh={setCommentRefresh}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
      </Card.Footer>
    </CardBase>
  );
}

export default Article;
