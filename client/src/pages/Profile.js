import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
// Context
import { AuthContext } from "../utils/context/AuthContext";

// API request config
import userService from "../services/userService";

// React-bootsrap components
import Card from "react-bootstrap/Card";

// Components
import ProfileForm from "../components/Profile/ProfileForm";
import ProfileCard from "../components/Profile/ProfileCard";

const Profile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        console.log("💥💥💥💥");
        const response = await userService.getUser(userId);
        console.log(`L'utilisateur de ce profil ${response.data}`);
        setProfile(response.data.user);
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
      <ProfileCard profile={profile} />
    </main>
  );
};

/* TODO: old profile form
 <Card className="rounded-3 shadow px-4 py-2">
          <Card.Body>
            <ProfileForm />
          </Card.Body>
        </Card>
*/

export default Profile;
