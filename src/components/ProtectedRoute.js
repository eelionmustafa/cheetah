import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = ['admin'] }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has any of the allowed roles
  if (!allowedRoles.includes(user?.role)) {
    // Redirect to home page if user doesn't have any of the allowed roles
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 