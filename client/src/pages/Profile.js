import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Context
import { AuthContext } from "../utils/context/AuthContext";

// Service
import userService from "../services/userService";

// Components
import ProfileCard from "../components/Profile/ProfileCard";
import { StyledButton } from "../utils/style/styles";
import DeleteButtonUser from "../components/Profile/DeleteButtonUser";
import Loader from "../components/Shared/Loader";

const Profile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let { userId } = useParams();
  userId = parseInt(userId);
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
          setError("Oups! Le profil que vous recherchez n'existe pas.");
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  const ProfileContent = (
    // If this is the profile of the current user, show
    <>
      <ProfileCard as="section" profile={profile} />
      {userId === currentUser.userId && (
        <StyledButton
          as={Link}
          to={`/profile/${currentUser.userId}/update`}
          $outline
          className="rounded-pill text-center py-1"
        >
          Modifier mon profil
        </StyledButton>
      )}
      {userId !== currentUser.userId && currentUser.isAdmin && (
        <DeleteButtonUser userId={userId} />
      )}
    </>
  );

  return (
    <main className="d-flex flex-column align-items-center mt-5">
      {isLoading ? <Loader /> : ProfileContent}
    </main>
  );
};

export default Profile;
