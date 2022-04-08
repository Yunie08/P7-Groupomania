import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const USER_URL = "/user";

class UserService {
  getCurrentUser() {
    return axios.get(`${USER_URL}/current`, setHeader());
  }

  getUser(userId) {
    return axios.get(`${USER_URL}/${userId}`, setHeader());
  }

  updateUser(userId, data, isMultipart) {
    return axios.put(`${USER_URL}/${userId}`, data, setHeader(isMultipart));
  }

  deleteUser(userId) {
    return axios.delete(`${USER_URL}/${userId}`, setHeader());
  }
}

export default new UserService();
