import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth }) => {
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
