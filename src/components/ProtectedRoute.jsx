import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  // Agar user logged in nahi hai, toh login page par redirect kar do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar logged in hai, toh jo route access karna chahta hai use render karne do
  return <Outlet />;
};

export default ProtectedRoute;