import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Outlet } from "react-router";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

const PrivateRoutes = ({ ...restofProps }) => {
  const { currentUser } = useContext(AuthContext);
  let { userId } = useParams();
  userId = parseInt(userId);

  return currentUser.userId === userId ? (
    <Outlet />
  ) : (
    <Navigate to={`/profile/${userId}`} />
  );
};

export default PrivateRoutes;
