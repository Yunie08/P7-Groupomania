import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Context
import { AuthContext } from "../utils/context/AuthContext";

// Service
import userService from "../services/userService";

// Components
import ProfileCard from "../components/Profile/ProfileCard";
import { StyledButton, LinkStyledButton } from "../utils/style/styles";
import DeleteButtonUser from "../components/Profile/DeleteButtonUser";
import Loader from "../components/Shared/Loader";
import ArticlesList from "../components/Shared/ArticlesList";

const Profile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let { userId } = useParams();
  userId = parseInt(userId);
  const { currentUser } = useContext(AuthContext);
  const [articleListEdited, setArticleListEdited] = useState(true);

  const [profile, setProfile] = useState(null);
  const isOwner = userId === currentUser.userId;
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

  return (
    <main className="d-flex flex-column align-items-center mt-5">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProfileCard as="section" profile={profile} />
          {isOwner && (
            <StyledButton
              as={Link}
              to={`/profile/${currentUser.userId}/update`}
              $outline
              className="rounded-pill text-center py-1 mb-5"
            >
              Modifier mon profil
            </StyledButton>
          )}
          {!isOwner && currentUser.role === "admin" && (
            <DeleteButtonUser userId={userId} />
          )}
          <h2>
            {isOwner
              ? "Tous mes articles"
              : `Tous les articles de ${profile.firstname}`}
          </h2>
          <ArticlesList
            articleListEdited={articleListEdited}
            setArticleListEdited={setArticleListEdited}
            filter={"byUser"}
            userId={userId}
          />
        </>
      )}
    </main>
  );
};

export default Profile;
