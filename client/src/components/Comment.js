import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Card from "react-bootstrap/Card";
import { ProfilePic, Username, PublishedTime } from "../utils/style/styles";
import DeleteButton from "./DeleteButton";
import styled from "styled-components";
import avatar from "../assets/temp/user2.jpg";

import colors from "../utils/style/colors";

// TODO: Move Time in a separate file / Component
dayjs.extend(relativeTime);
dayjs.locale("fr");

const StyledCard = styled(Card)`
  border-left: 3px solid ${colors.secondaryDark};
`;

const Comment = ({ data, setCommentRefresh }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  return (
    <StyledCard className="shadow-sm my-3 ">
      <Card.Body>
        <Card.Header className="bg-white border-bottom-0 d-flex p-0 mb-2">
          <ProfilePic
            comment
            src={data.User.profilePic}
            alt={`Photo de profil de ${data.firstname} ${data.lastname}`}
            className="img-fluid rounded-circle"
          />
          <div className="col d-flex flex-column justify-content-center ms-2">
            <Username comment className="mb-0">
              {data.User.firstname} {data.User.lastname}
            </Username>
            <PublishedTime comment className="m-0">
              {dayjs(data.createdAt).fromNow()}
            </PublishedTime>
          </div>
          {userId === data.userId && (
            <DeleteButton
              articleId={data.articleId}
              id={data.id}
              setCommentRefresh={setCommentRefresh}
            />
          )}
        </Card.Header>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default Comment;
