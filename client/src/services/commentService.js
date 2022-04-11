import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const ARTICLE_URL = "/article";

class CommentService {
  getAllComments(articleId) {
    return axios.get(`${ARTICLE_URL}/${articleId}/comment`, setHeader());
  }

  addComment(articleId, data) {
    return axios.post(`${ARTICLE_URL}/${articleId}/comment`, data, setHeader());
  }

  deleteComment(articleId, commentId) {
    return axios.delete(
      `${ARTICLE_URL}/${articleId}/comment/${commentId}`,
      setHeader()
    );
  }
}

export default new CommentService();
