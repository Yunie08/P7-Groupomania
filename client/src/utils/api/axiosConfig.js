import axios from "axios";

// Axios configuration
const customAxios = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// Response interceptor configuration
customAxios.interceptors.response.use(
  // If the response is a success, we return it as is
  function (response) {
    return response;
  },
  // If the response is an error we handle it
  function (error) {
    // In case of a 401 unauthorized request
    // This means our token is either expired or malformed
    // We log the user out
    if (error.response.status === 401) {
      localStorage.clear();
      window.location = "/auth";
    }
    return Promise.reject(error);
  }
);

export default customAxios;
