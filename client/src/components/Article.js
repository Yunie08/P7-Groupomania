import React from "react";

import Card from "react-bootstrap/Card";

import ToggleComments from "./ToggleComments";

import {
  LinkStyledButton,
  ProfilePic,
  Username,
  PublishedTime,
  MainCard,
} from "../utils/style/styles";
// Temporary Assets
import avatar from "../assets/temp/user2.jpg";
import {} from "../utils/style/styles";

function Article(
  articleId,
  userId,
  firstname,
  lastname,
  profilePic,
  title,
  content,
  createdAt
) {
  console.log(firstname);
  return (
    <article className="my-3 col-md-9 col-lg-8 d-flex justify-content-center">
      <MainCard className=" rounded-3 shadow px-md-2 py-2">
        <Card.Body>
          <Card.Header className="bg-white border-bottom-0 d-flex">
            <ProfilePic
              src={profilePic}
              alt={`Photo de profil de ${firstname} ${lastname}`}
              className="img-fluid rounded-circle"
            />
            <div className="col d-flex flex-column justify-content-center border-bottom border-3 ms-3">
              <Username className="mb-1">
                {firstname} {lastname}
              </Username>
              <PublishedTime className="m-0">
                publié il y a ${createdAt}
              </PublishedTime>
            </div>
          </Card.Header>
          <Card.Title as="h2" className="text-center my-3">
            {title}
          </Card.Title>
          <Card.Text className="px-md-4 border-bottom border-3 pb-3">
            {content}
          </Card.Text>
          <Card.Footer className="bg-white border-top-0 px-0">
            <LinkStyledButton className="me-3">
              <i className="fa-solid fa-thumbs-up fa-lg"></i>
              J'aime
            </LinkStyledButton>
            <ToggleComments />
          </Card.Footer>
        </Card.Body>
      </MainCard>
    </article>
  );
}

export default Article;
