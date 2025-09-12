import React, { Suspense, lazy } from 'react';
import { Routes, Route as RouterRoute, Navigate } from 'react-router-dom';
import { useRoutes } from '@/hooks/useRoutes';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load all page components
const componentMap = {
  Index: lazy(() => import('@/pages/Index')),
  Login: lazy(() => import('@/pages/Login')),
  Signup: lazy(() => import('@/pages/Signup')),
  LanguageSelection: lazy(() => import('@/pages/LanguageSelection')),
  PermissionsRequest: lazy(() => import('@/pages/PermissionsRequest')),
  OTPVerification: lazy(() => import('@/pages/OTPVerification')),
  BrokerDashboard: lazy(() => import('@/pages/BrokerDashboard')),
  BecomeBroker: lazy(() => import('@/pages/BecomeBroker')),
  FindBroker: lazy(() => import('@/pages/FindBroker')),
  NearbyBrokers: lazy(() => import('@/pages/NearbyBrokers')),
  BookBroker: lazy(() => import('@/pages/BookBroker')),
  BrokerProfile: lazy(() => import('@/pages/BrokerProfile')),
  Messages: lazy(() => import('@/pages/Messages')),
  Requests: lazy(() => import('@/pages/Requests')),
  Profile: lazy(() => import('@/pages/Profile')),
  MarketingMaterials: lazy(() => import('@/pages/MarketingMaterials')),
  NotFound: lazy(() => import('@/pages/NotFound')),
};

export const DynamicRouter: React.FC = () => {
  const { routes, loading, error } = useRoutes();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Router error:', error);
    // Fallback to basic routing if database routes fail
    return <Navigate to="/not-found" replace />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routes.map((route) => {
          const Component = componentMap[route.component as keyof typeof componentMap];
          
          if (!Component) {
            console.warn(`Component "${route.component}" not found for route "${route.path}"`);
            return null;
          }

          return (
            <RouterRoute
              key={route.id}
              path={route.path}
              element={
                <ProtectedRoute route={route}>
                  <Component />
                </ProtectedRoute>
              }
            />
          );
        })}
        
        {/* Catch-all route for 404 */}
        <RouterRoute path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
};