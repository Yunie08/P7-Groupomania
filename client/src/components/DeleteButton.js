import { useEffect } from "react";
import axios from "../utils/api/axiosConfig";
import { LinkStyledButton } from "../utils/style/styles";

const ARTICLE_URL = "/article";

const DeleteButton = ({
  articleId,
  id,
  commentRefresh,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
}) => {
  const token = localStorage.getItem("token");
  const deleteItem = async () => {
    try {
      await axios.delete(`${ARTICLE_URL}/${articleId}/comment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentRefresh(true);
      setCommentsCount(commentsCount - 1);
    } catch (error) {}
  };

  return (
    <LinkStyledButton onClick={() => deleteItem()} className="align-self-start">
      <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      <span className="sr-only">Supprimer le commentaire</span>
    </LinkStyledButton>
  );
};

export default DeleteButton;
