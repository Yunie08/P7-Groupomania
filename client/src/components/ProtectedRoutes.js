import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

const ProtectedRoutes = ({ element: Component, ...restofProps }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
