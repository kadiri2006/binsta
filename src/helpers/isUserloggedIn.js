import React from "react";
import { Navigate } from "react-router-dom";
import { DASHBOARD } from "../constants/routes";
import { useUserContext } from "../context/user";

export default function IsUserloggedIn({ children }) {
  let { user } = useUserContext();
  if (user) return <Navigate to={DASHBOARD} replace />;
  return children;
}
