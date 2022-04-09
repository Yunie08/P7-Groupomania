import axios from "../utils/api/axiosConfig";

// React-bootsrap components
import Card from "react-bootstrap/Card";

// Components
import ProfileUpdateForm from "../components/Profile/ProfileUpdateForm";
import CardBase from "../components/Shared/CardBase";
import { StyledButton } from "../utils/style/styles";

const ProfileUpdate = () => {
  return (
    <main className="d-flex flex-column align-items-center">
      <h1>Modifier votre profil</h1>

      <CardBase>
        <ProfileUpdateForm />
      </CardBase>

      <StyledButton $outline className="rounded-pill">
        Modifier mon mot de passe
      </StyledButton>
      <StyledButton $danger className="rounded-pill my-2">
        Supprimer mon compte
      </StyledButton>
    </main>
  );
};

export default ProfileUpdate;
