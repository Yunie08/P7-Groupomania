import Card from "react-bootstrap/Card";
import { ProfilePic, MainCard } from "../../utils/style/styles";

import React from "react";

const ProfileCard = ({ profile }) => {
  console.log(profile);
  return (
    <MainCard className="my-5 col-md-9 col-lg-8 rounded-3 shadow px-md-2 py-2">
      <Card.Body className="bg-white">
        <Card.Header className="bg-white border-bottom-0 d-flex">
          <Card.Title>
            {profile.firstname} {profile.lastname}
          </Card.Title>
          Mon profile
        </Card.Header>
      </Card.Body>
    </MainCard>
  );
};

export default ProfileCard;
