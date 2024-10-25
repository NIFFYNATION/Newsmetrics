import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/index';

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userLoggedIn) {
    localStorage.setItem('loggedOutDueToInactivity', 'true');
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
