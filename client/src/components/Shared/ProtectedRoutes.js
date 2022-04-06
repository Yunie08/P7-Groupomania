import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

const ProtectedRoutes = ({ element: Component, ...restofProps }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
