import React from "react";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import { useUserContext } from "../context/user";

export default function ProtectedRoute({ children }) {

  let { user } = useUserContext();

  if (user) return children;
  return <Navigate to={LOGIN} replace />;
}
