import axios from "axios";
import { useState, useEffect, useContext } from "react";

// Context
import { AuthContext } from "../context/AuthContext";

// Components
import TokenExpiredMessage from "../../components/Auth/TokenExpiredMessage";

// Axios configuration
const customAxios = axios.create({
  baseURL: "https://groupomania-heroku-api.herokuapp.com/api",
  timeout: 10000,
});

// Response interceptor configuration
const AxiosInterceptor = () => {
  const [isTokenExpired, setTokenExpired] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // if the response is a success, we return it as is
    const resInterceptor = (response) => {
      return response;
    };

    // if the response is an error
    const errInterceptor = (error) => {
      if (
        // and if this error is a 401 Unauthorized not coming from invalid login values
        error.response.status === 401 &&
        !(
          error.response.request.responseURL ===
            "http://localhost:8080/api/auth/login" ||
          error.response.request.responseURL ===
            "https://groupomania-heroku-api.herokuapp.com/api"
        )
      ) {
        // it means that the json web token is expired or malformed
        // => the user is logged out and redirected to auth page
        setTokenExpired(true);
        logout();
      }

      throw error;
    };

    const interceptor = customAxios.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => customAxios.interceptors.response.eject(interceptor);
  }, []);

  // if the token is expired a modal explaining why the user has been logged out is displayed
  return (
    isTokenExpired && <TokenExpiredMessage setTokenExpired={setTokenExpired} />
  );
};

export default customAxios;
export { AxiosInterceptor };
