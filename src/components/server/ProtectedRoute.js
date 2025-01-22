import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  return isLoggedIn ? children : <Navigate to="/adminlogin" />;
};

export default ProtectedRoute;
