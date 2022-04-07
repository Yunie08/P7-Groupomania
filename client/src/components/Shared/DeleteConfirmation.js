import Modal from "react-bootstrap/Modal";
import axios from "../../utils/api/axiosConfig";
import { StyledButton, LinkStyledButton } from "../../utils/style/styles";

const ARTICLE_URL = "/article";

const DeleteConfirmation = ({
  componentToDelete,
  articleId,
  id,
  commentRefresh,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
  articleListEdited,
  setArticleListEdited,
  show,
  onHide,
}) => {
  const token = localStorage.getItem("token");
  const deleteItem = async () => {
    try {
      // Set url depending on if used to delete article or comment
      const URL_TO_DELETE =
        componentToDelete === "article"
          ? `${ARTICLE_URL}/${articleId}`
          : `${ARTICLE_URL}/${articleId}/comment/${id}`;

      await axios.delete(URL_TO_DELETE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      switch (componentToDelete) {
        case "article":
          setArticleListEdited(true);
          onHide();
          break;
        case "comment":
          setCommentRefresh(true);
          setCommentsCount(commentsCount - 1);
          break;
        case "user":
          break;
        default:
          message += "cet élément";
      }
    } catch (error) {}
  };
  let message = "Voulez-vous vraiment supprimer ";
  switch (componentToDelete) {
    case "article":
      message += "cet article ?";
      break;
    case "comment":
      message += "ce commentaire ?";
      break;
    case "user":
      message += "ce profil ?";
      break;
    default:
      message += "cet élément";
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      as="section"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h3" id="contained-modal-title-vcenter">
          {message}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 d-flex justify-content-center">
        <StyledButton $outline onClick={onHide} className="me-2 rounded-pill">
          Annuler
        </StyledButton>
        <StyledButton
          $danger
          onClick={() => deleteItem()}
          className="rounded-pill"
        >
          Confirmer
        </StyledButton>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmation;
