// Hooks
import useCanDelete from "../../utils/hooks/useCanDelete";

// Components
import Card from "react-bootstrap/Card";
import AuthorLink from "./AuthorLink";
import ProfilePic from "../Shared/ProfilePic";
import DeleteButton from "../Shared/DeleteButton";
import PublishedTime from "./PublishedTime";

// Style
import styled from "styled-components";
import colors from "../../utils/style/colors";

const StyledCard = styled(Card)`
  border-left: 3px solid ${colors.secondaryDark};
`;

const Comment = ({
  data,
  commentRefresh,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
}) => {
  const userId = data.user.id;
  const canDelete = useCanDelete(userId, ["moderator", "admin"]);

  return (
    <StyledCard className="shadow-sm my-3 ">
      <Card.Body>
        <Card.Header className="bg-white border-bottom-0 d-flex p-0 mb-2">
          <ProfilePic
            comment
            src={data.user.profilePic}
            alt={`Photo de profil de ${data.firstname} ${data.lastname}`}
            type={"comment"}
          />
          <div className="col d-flex flex-column justify-content-center ms-2">
            <AuthorLink
              firstname={data.user.firstname}
              lastname={data.user.lastname}
              type={"comment"}
              userId={data.user.id}
            />
            <PublishedTime createdAt={data.createdAt} className="m-0" />
          </div>
          {canDelete && (
            <DeleteButton
              componentToDelete="comment"
              articleId={data.articleId}
              commentId={data.id}
              setCommentRefresh={setCommentRefresh}
              commentRefresh={commentRefresh}
              setCommentsCount={setCommentsCount}
              commentsCount={commentsCount}
            />
          )}
        </Card.Header>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default Comment;
