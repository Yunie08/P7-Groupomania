// Components
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ProfilePic from "../Shared/ProfilePic";
import SocialLink from "./SocialLink";
import CardBase from "../Shared/CardBase";

// TODO: refactor socials
const ProfileCard = ({ profile }) => {
  return (
    <CardBase>
      <Card.Header className="bg-white d-flex flex-column align-items-center position-relative">
        {profile.role !== "user" && (
          <Badge className="position-absolute top-0 end-0 bg-secondary">
            {profile.role === "admin" ? "Admin" : "Modérateur"}
          </Badge>
        )}
        <ProfilePic
          src={profile.profilePic}
          alt={`Photo de profil de ${profile.firstname} ${profile.lastname}`}
          type={"profile"}
        />
        <Card.Title as="h1" className="mt-3">
          {profile.firstname} {profile.lastname}
        </Card.Title>

        {profile.bio && <p>{profile.bio}</p>}
      </Card.Header>

      <Card.Text className="d-flex gap-2 justify-content-center mt-4">
        {profile.linkedinProfile && (
          <SocialLink href={profile.linkedinProfile} type="linkedin" />
        )}
        {profile.twitterProfile && (
          <SocialLink href={profile.twitterProfile} type="twitter" />
        )}
        {profile.instagramProfile && (
          <SocialLink href={profile.instagramProfile} type="instagram" />
        )}
        {profile.facebookProfile && (
          <SocialLink href={profile.facebookProfile} type="facebook" />
        )}
      </Card.Text>
    </CardBase>
  );
};

export default ProfileCard;
