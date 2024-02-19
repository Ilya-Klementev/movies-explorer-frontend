import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, loggedIn, ...props }) => {
  console.log(loggedIn);
  return (
    <>{loggedIn ? <Component { ...props } /> : <Navigate to="/" />}</>
  );
};

export default ProtectedRoute;
