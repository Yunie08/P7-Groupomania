import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });
  console.log(`Current user from AuthContext: ${currentUser}`);
  console.log(`isAuthenticated from AuthContext: ${isAuthenticated}`);
  const value = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
