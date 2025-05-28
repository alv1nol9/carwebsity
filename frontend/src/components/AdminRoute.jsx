import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const decode = jwt_decode.default || jwt_decode;

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { isAdmin } = decode(token);
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}
