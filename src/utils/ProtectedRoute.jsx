import extractAndDecodeToken from '@/services/auth.service';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    console.log("HELLOOOOO")
    console.log("HELLOOOOO")
    console.log("HELLOOOOO")

  const token = extractAndDecodeToken();
  console.log("HELLOOOOO")
  if (!token) {
    // Redirect to login page if token is not present
    return <Navigate to="/auth/sign-in" />;
  }

  // Render children if token is present
  return children;
};

export default ProtectedRoute;
