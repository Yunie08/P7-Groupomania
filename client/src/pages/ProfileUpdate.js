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
import UpdatePasswordModal from "../components/Profile/UpdatePasswordModal";

const ProfileUpdate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfile] = useState(null);
  let { userId } = useParams();
  userId = parseInt(userId);

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
          <StyledButton
            onClick={() => setModalShow(true)}
            $outline
            className="rounded-pill"
          >
            Modifier mon mot de passe
          </StyledButton>
          <UpdatePasswordModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalShow={setModalShow}
            userId={userId}
          />
          <DeleteButtonUser userId={userId} />
        </>
      )}
    </main>
  );
};

export default ProfileUpdate;
