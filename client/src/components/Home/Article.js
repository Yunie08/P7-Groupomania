import { useState } from "react";
import Card from "react-bootstrap/Card";

import ToggleComments from "./ToggleComments";
import AddComment from "./AddComment";
import PublishedTime from "./PublishedTime";
import ArticleImage from "./ArticleImage";
import { ProfilePic, Username, MainCard } from "../../utils/style/styles";
import LikeButton from "./LikeButton";

function Article({ data }) {
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [commentsCount, setCommentsCount] = useState(data.commentsCount);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const [likedByUser, setLikedByUser] = useState();

  return (
    <MainCard
      as="article"
      className="my-3 col-md-9 col-lg-8 rounded-3 shadow px-md-2 py-2"
    >
      <Card.Body className="bg-white">
        <Card.Header className="bg-white border-bottom-0 d-flex">
          <ProfilePic
            src={data.user.profilePic}
            alt={`Photo de profil de ${data.user.firstname} ${data.user.lastname}`}
            className="img-fluid rounded-circle"
          />
          <div className="col d-flex flex-column justify-content-center border-bottom border-3 ms-3">
            <Username className="mb-1">
              {data.user.firstname} {data.user.lastname}
            </Username>
            <PublishedTime
              inArticle
              createdAt={data.createdAt}
              className="m-0"
            />
          </div>
        </Card.Header>
        <div className="px-md-4 d-flex flex-column">
          <Card.Title as="h2" className="my-3">
            {data.title}
          </Card.Title>
          {data?.image && (
            <ArticleImage title={data.title} source={data.image} />
          )}

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
      </Card.Body>
    </MainCard>
  );
}

export default Article;