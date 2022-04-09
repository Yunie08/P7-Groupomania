import { createContext, useState, useEffect } from "react";

// API requests config
import axios from "../api/axiosConfig";
import setHeader from "../api/headerConfig";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      return user;
    }
    return null;
  });
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  // Check if token in local storage
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { userId, isAdmin } = JSON.parse(localStorage.getItem("user"));
        setCurrentUser({ userId, isAdmin });
      } else {
        setCurrentUser(null);
        setAuthenticated(null);
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
