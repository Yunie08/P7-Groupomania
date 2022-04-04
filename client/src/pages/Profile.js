import React from "react";

// React-bootsrap components
import Card from "react-bootstrap/Card";

// Components
import ProfileForm from "../components/Profile/ProfileForm";

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
