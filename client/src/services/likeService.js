import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const ARTICLE_URL = "/article";

class LikeService {
  sendLike(articleId, likeValue) {
    return axios.post(
      `${ARTICLE_URL}/${articleId}/like`,
      likeValue,
      setHeader()
    );
  }

  getLike(articleId) {
    return axios.get(`${ARTICLE_URL}/${articleId}/like`, setHeader());
  }
}

export default new LikeService();
