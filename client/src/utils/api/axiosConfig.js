import { useState, useEffect, useContext } from "react";
import TokenExpiredMessage from "../../components/Auth/TokenExpiredMessage";
import axios from "axios";

// Context
import { AuthContext } from "../context/AuthContext";

// Axios configuration
const customAxios = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// Response interceptor configuration
const AxiosInterceptor = () => {
  const [isTokenExpired, setTokenExpired] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      if (error.response.status === 401) {
        setTokenExpired(true);
        logout();
      }

      return Promise.reject(error);
    };

    const interceptor = customAxios.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => customAxios.interceptors.response.eject(interceptor);
  }, []);

  return (
    isTokenExpired && <TokenExpiredMessage setTokenExpired={setTokenExpired} />
  );
};

export default customAxios;
export { AxiosInterceptor };
