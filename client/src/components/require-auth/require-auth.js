import React from "react";
import { useAuthData } from "../../contexts/auth-context";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const { auth } = useAuthData();
  const location = useLocation();

  return auth.isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
