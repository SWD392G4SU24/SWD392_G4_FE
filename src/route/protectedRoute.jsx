import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/features/counterSlice";

export const ProtectedRoute = ({ element, ...rest }) => {
  const accessToken = localStorage.getItem("token");
  return accessToken ? element : <Navigate to="/login1" />;
};
export const ValidRouteManager = ({ element, ...rest }) => {
  const user = useSelector(selectUser);
  const role = user.role;
  console.log(role);
  return role === "Manager" ? element : <Navigate to="/" />;
};
export const ValidRouteStaff = ({ element, ...rest }) => {
  const user = useSelector(selectUser);
  const role = user.role;
  return role === "Staff" ? element : <Navigate to="/" />;
};
export const ValidRouteAdmin = ({ element, ...rest }) => {
  const user = useSelector(selectUser);
  const role = user.role;
  return role === "Admin" ? element : <Navigate to="/" />;
};
