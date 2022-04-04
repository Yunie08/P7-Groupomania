import Card from "react-bootstrap/Card";
import { ProfilePic, Username } from "../../utils/style/styles";
import DeleteButton from "../Shared/DeleteButton";
import PublishedTime from "./PublishedTime";
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
  const userId = JSON.parse(localStorage.getItem("userId"));

  return (
    <StyledCard className="shadow-sm my-3 ">
      <Card.Body>
        <Card.Header className="bg-white border-bottom-0 d-flex p-0 mb-2">
          <ProfilePic
            comment
            src={data.user.profilePic}
            alt={`Photo de profil de ${data.firstname} ${data.lastname}`}
            className="img-fluid rounded-circle"
          />
          <div className="col d-flex flex-column justify-content-center ms-2">
            <Username comment className="mb-0">
              {data.user.firstname} {data.user.lastname}
            </Username>
            <PublishedTime createdAt={data.createdAt} className="m-0" />
          </div>
          {userId === data.userId && (
            <DeleteButton
              articleId={data.articleId}
              id={data.id}
              setCommentRefresh={setCommentRefresh}
              commentRefresh={commentRefresh}
              commentsCount={commentsCount}
              setCommentsCount={setCommentsCount}
            />
          )}
        </Card.Header>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default Comment;
