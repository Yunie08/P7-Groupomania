import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "../../utils/api/axiosConfig";
import AddArticleForm from "./AddArticleForm";

const AddArticleModal = (props) => {
  const { setModalShow, setArticleListEdited, ...rest } = props;

  return (
    <Modal
      {...rest}
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
      <Modal.Body className="px-md-5">
        <AddArticleForm
          setModalShow={setModalShow}
          setArticleListEdited={setArticleListEdited}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddArticleModal;
