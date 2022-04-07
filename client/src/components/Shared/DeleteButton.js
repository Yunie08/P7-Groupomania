import { useState, useEffect } from "react";
import axios from "../../utils/api/axiosConfig";
import { LinkStyledButton } from "../../utils/style/styles";
import DeleteConfirmation from "./DeleteConfirmation";

const DeleteButton = ({
  componentToDelete,
  articleId,
  id,
  commentRefresh,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
  articleListEdited,
  setArticleListEdited,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <LinkStyledButton
        onClick={() => setModalShow(true)}
        className="align-self-start"
      >
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        <span className="sr-only">Supprimer</span>
      </LinkStyledButton>
      <DeleteConfirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        componentToDelete={componentToDelete}
        articleId={articleId}
        id={id}
        setCommentRefresh={setCommentRefresh}
        commentRefresh={commentRefresh}
        commentsCount={commentsCount}
        setCommentsCount={setCommentsCount}
        articleListEdited={articleListEdited}
        setArticleListEdited={setArticleListEdited}
      />
    </>
  );
};

export default DeleteButton;
