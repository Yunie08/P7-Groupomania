import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "../../utils/api/axiosConfig";
import AddArticleForm from "./AddArticleForm";

const AddArticleModal = (props) => {
  return (
    <Modal
      {...props}
      as="section"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h2" id="contained-modal-title-vcenter">
          Publier un article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        <AddArticleForm
          setModalShow={props.setModalShow}
          setArticleAdded={props.setArticleAdded}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddArticleModal;
