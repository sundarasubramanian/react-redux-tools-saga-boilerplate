import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';

/**
 * ProtectedRoute — wraps routes that require authentication.
 * Redirects to /login if the user is not authenticated.
 */
function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet  /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
