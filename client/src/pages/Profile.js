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
import ArticlesList from "../components/Shared/ArticlesList";
import PageNotFound from "./PageNotFound";

const Profile = () => {
  const [ApiError, setError] = useState(null);
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
        if (error.response?.status === 404) {
          setError(error.response?.status);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  if (ApiError === 404) return <PageNotFound />;
  return (
    <main className="d-flex flex-column align-items-center mt-5 py-5">
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
              className="rounded-pill text-center py-1 my-3"
            >
              Modifier mon profil
            </StyledButton>
          )}
          {!isOwner && currentUser.role === "admin" && (
            <DeleteButtonUser userId={userId} />
          )}
          <h2 className="mt-5 mb-3">
            {isOwner
              ? "Tous mes articles"
              : `Tous les articles de ${profile?.firstname}`}
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
