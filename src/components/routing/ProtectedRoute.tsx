import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Route } from '@/hooks/useRoutes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  route: Route;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, route }) => {
  const { user } = useAuth();

  // Check if route is accessible
  const isAccessible = () => {
    if (route.access_level === 'public') return true;
    if (!user) return false;
    if (route.access_level === 'authenticated') return true;
    return route.access_level === user.role;
  };

  // Redirect if not accessible
  if (!isAccessible()) {
    if (!user) {
      // Not logged in, redirect to login
      return <Navigate to="/login" replace />;
    } else {
      // Wrong role, redirect based on user role
      const redirectPath = user.role === 'broker' ? '/broker-dashboard' : '/';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
};