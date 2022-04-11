import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// API request config
import userService from "../services/userService";

// Components
import ProfileUpdateForm from "../components/Profile/ProfileUpdateForm";
import CardBase from "../components/Shared/CardBase";
import Loader from "../components/Shared/Loader";
import DeleteButtonUser from "../components/Profile/DeleteButtonUser";
import { StyledButton } from "../utils/style/styles";

const ProfileUpdate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let { userId } = useParams();
  userId = parseInt(userId);
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
  }, [userId]);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="mb-5">Modifier votre profil</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CardBase>
            <ProfileUpdateForm profile={profile} />
          </CardBase>
          <DeleteButtonUser userId={userId} />
        </>
      )}
    </main>
  );
};

export default ProfileUpdate;

// TODO:
{
  /* <StyledButton $outline className="rounded-pill">
            Modifier mon mot de passe
          </StyledButton> */
}
