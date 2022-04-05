import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const ARTICLE_URL = "/article";

class ArticleService {
  addArticle(data, isMultipart) {
    return axios.post(ARTICLE_URL, data, setHeader(isMultipart));
  }
}

export default new ArticleService();
