import { useEffect } from "react";
import axios from "../../utils/api/axiosConfig";
import { LinkStyledButton } from "../../utils/style/styles";

const ARTICLE_URL = "/article";

const DeleteButton = ({
  componentToDelete,
  articleId,
  id,
  commentRefresh,
  setCommentRefresh,
  commentsCount,
  setCommentsCount,
  ArticleCount,
  setArticleCount,
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
      if (componentToDelete === "comment") {
        setCommentRefresh(true);
        setCommentsCount(commentsCount - 1);
      } else {
      }
    } catch (error) {}
  };

  return (
    <LinkStyledButton onClick={() => deleteItem()} className="align-self-start">
      <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      <span className="sr-only">Supprimer</span>
    </LinkStyledButton>
  );
};

export default DeleteButton;
