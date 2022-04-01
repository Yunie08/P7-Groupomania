import Card from "react-bootstrap/Card";
import { ProfilePic, Username, PublishedTime } from "../utils/style/styles";
import styled from "styled-components";
import avatar from "../assets/temp/user2.jpg";

import colors from "../utils/style/colors";

const StyledCard = styled(Card)`
  border-left: 3px solid ${colors.secondaryDark};
`;

const Comment = () => {
  return (
    <StyledCard className="shadow-sm my-3 ">
      <Card.Body>
        <Card.Header className="bg-white border-bottom-0 d-flex p-0 mb-2">
          <ProfilePic
            comment
            src={avatar}
            alt="Photo de profil de User 2"
            className="img-fluid rounded-circle"
          />
          <div className="col d-flex flex-column justify-content-center ms-2">
            <Username comment className="mb-0">
              Eloïse Liaut
            </Username>
            <PublishedTime comment className="m-0">
              publié il y a 25 minutes
            </PublishedTime>
          </div>
        </Card.Header>
        <Card.Text>Très bonne idée !</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default Comment;
