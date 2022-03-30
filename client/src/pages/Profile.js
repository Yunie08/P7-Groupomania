import React from "react";
import styled from "styled-components";

// React-bootsrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// Components
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  return (
    <main>
      <h1>Votre profil</h1>
      <section>
        <Card className="rounded-3 shadow px-4 py-2">
          <Card.Body>
            <ProfileForm />
          </Card.Body>
        </Card>
      </section>
    </main>
  );
};

export default Profile;
