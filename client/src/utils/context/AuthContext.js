import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialization of values depending on values in localStorage
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

  // Persist context values on refresh
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { userId, role } = JSON.parse(localStorage.getItem("user"));
        setCurrentUser({ userId, role });
      } else {
        setCurrentUser(null);
        setAuthenticated(false);
      }
    };
    checkToken();
  }, [setAuthenticated]);

  // Login user
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: data.userId,
        role: data.role,
      })
    );
    setAuthenticated(true);
    setCurrentUser({
      userId: data.userId,
      role: data.role,
    });
  };

  // Logout user
  const logout = () => {
    setAuthenticated(false);
    setCurrentUser(null);
    localStorage.clear();
  };

  // Values provided by context
  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
