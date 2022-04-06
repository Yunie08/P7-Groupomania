import { useContext } from "react";
import Card from "react-bootstrap/Card";
import { ProfilePic, Username } from "../../utils/style/styles";
import DeleteButton from "../Shared/DeleteButton";
import PublishedTime from "./PublishedTime";
import styled from "styled-components";
import colors from "../../utils/style/colors";

import { AuthContext } from "../../utils/context/AuthContext";

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
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  // TODO: refactor delete button logic
  const canEdit = currentUser.userId === data.userId || currentUser.isAdmin;
  console.log(canEdit);
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
          {canEdit && (
            <DeleteButton
              componentToDelete="comment"
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
