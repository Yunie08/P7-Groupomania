import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Context
import { AuthContext } from "../utils/context/AuthContext";

// API request config
import userService from "../services/userService";

// Components
import ProfileCard from "../components/Profile/ProfileCard";
import { StyledButton } from "../utils/style/styles";

const Profile = () => {
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

  const ProfileContent =
    userId * 1 === currentUser.userId ? (
      <>
        <ProfileCard as="section" profile={profile} />
        <StyledButton
          as={Link}
          to={`/profile/${currentUser.userId}/update`}
          $outline
          className="rounded-pill text-center py-1"
        >
          Modifier mon profil
        </StyledButton>
      </>
    ) : (
      <ProfileCard as="section" profile={profile} />
    );

  return (
    <main className="d-flex flex-column align-items-center mt-5">
      {isLoading ? <span>Patience ça charge</span> : ProfileContent}
    </main>
  );
};

export default Profile;
