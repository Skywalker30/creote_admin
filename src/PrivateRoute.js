import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.js";

function PrivateRoute({ element, ...props }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
