import { createContext, useState, useEffect } from "react";

// API requests config
import axios from "../api/axiosConfig";
import setHeader from "../api/headerConfig";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  // Check if token in local storage
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/user/current", setHeader());
        console.log(response.data);
        setCurrentUser({
          userId: response.data.user.id,
          isAdmin: response.data.user.isAdmin,
        });
      }
    };
    checkToken();
  }, [setAuthenticated]);
  console.log(`Current user from AuthContext: ${currentUser?.userId}`);
  console.log(`isAuthenticated from AuthContext: ${isAuthenticated}`);
  const value = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
