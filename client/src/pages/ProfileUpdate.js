import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Context
import { AuthContext } from "../utils/context/AuthContext";

// API request config
import userService from "../services/userService";

// Components
import ProfileUpdateForm from "../components/Profile/ProfileUpdateForm";
import CardBase from "../components/Shared/CardBase";
import { StyledButton } from "../utils/style/styles";

const ProfileUpdate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUser(userId);
        setProfile(response?.data?.user);
      } catch (error) {
        if (error.response?.status === "404") {
          setError("Oups! Le profil que vous cherchez n'existe pas.");
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1>Modifier votre profil</h1>
      {isLoading ? (
        <p>Patience ça charge</p>
      ) : (
        <>
          <CardBase>
            <ProfileUpdateForm profile={profile} />
          </CardBase>

          <StyledButton $outline className="rounded-pill">
            Modifier mon mot de passe
          </StyledButton>
          <StyledButton $danger className="rounded-pill my-2">
            Supprimer mon compte
          </StyledButton>
        </>
      )}
    </main>
  );
};

export default ProfileUpdate;
