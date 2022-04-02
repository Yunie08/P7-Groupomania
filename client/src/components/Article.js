import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Card from "react-bootstrap/Card";
import ToggleComments from "./ToggleComments";
import AddComment from "./AddComment";
import {
  LinkStyledButton,
  ProfilePic,
  Username,
  PublishedTime,
  MainCard,
} from "../utils/style/styles";

// TODO: Move Time in a separate file / Component
dayjs.extend(relativeTime);
dayjs.locale("fr");

const ARTICLE_URL = "/article";

function Article({ data }) {
  return (
    <MainCard
      as="article"
      className="my-3 col-md-9 col-lg-8 rounded-3 shadow px-md-2 py-2"
    >
      <Card.Body className="bg-white">
        <Card.Header className="bg-white border-bottom-0 d-flex">
          <ProfilePic
            src={data.User.profilePic}
            alt={`Photo de profil de ${data.firstname} ${data.lastname}`}
            className="img-fluid rounded-circle"
          />
          <div className="col d-flex flex-column justify-content-center border-bottom border-3 ms-3">
            <Username className="mb-1">
              {data.User.firstname} {data.User.lastname}
            </Username>
            <PublishedTime className="m-0">
              publié {dayjs(data.createdAt).fromNow()}
            </PublishedTime>
          </div>
        </Card.Header>
        <Card.Title as="h2" className="px-md-4 my-3">
          {data.title}
        </Card.Title>
        <Card.Text className="px-md-4 border-bottom border-3 pb-3">
          {data.content}
        </Card.Text>
        <Card.Footer className="bg-white border-top-0 px-0">
          <LinkStyledButton className="me-3">
            <i className="fa-solid fa-thumbs-up fa-lg"></i>
            J'aime
          </LinkStyledButton>
          <ToggleComments articleId={data.id} />
          <AddComment articleId={data.id} />
        </Card.Footer>
      </Card.Body>
    </MainCard>
  );
}

export default Article;
