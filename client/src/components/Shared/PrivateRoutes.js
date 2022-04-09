import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Outlet } from "react-router";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

const PrivateRoutes = ({ ...restofProps }) => {
  const { currentUser } = useContext(AuthContext);
  const { userId } = useParams();
  console.log(currentUser.userId, userId);
  console.log("On est dans le private routes");
  return currentUser.userId === userId * 1 ? (
    <Outlet />
  ) : (
    <Navigate to={`/profile/${userId}`} />
  );
};

export default PrivateRoutes;
