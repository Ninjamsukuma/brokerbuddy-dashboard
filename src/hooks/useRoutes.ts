import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Route {
  id: string;
  path: string;
  name: string;
  title: string;
  description?: string;
  component: string;
  access_level: 'public' | 'authenticated' | 'client' | 'broker' | 'admin';
  parent_route_id?: string;
  is_navigation_item: boolean;
  icon?: string;
  order_priority: number;
  redirect_path?: string;
}

export const useRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRoutes();
  }, [user]);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase.rpc('get_user_routes', {
        user_role: user?.role || null
      });

      if (fetchError) {
        throw fetchError;
      }

      setRoutes(data || []);
    } catch (err: any) {
      console.error('Error fetching routes:', err);
      setError(err.message || 'Failed to fetch routes');
    } finally {
      setLoading(false);
    }
  };

  const getNavigationRoutes = (): Route[] => {
    return routes.filter(route => route.is_navigation_item);
  };

  const getRouteByPath = (path: string): Route | undefined => {
    return routes.find(route => route.path === path);
  };

  const isRouteAccessible = (route: Route): boolean => {
    if (route.access_level === 'public') return true;
    if (!user) return false;
    if (route.access_level === 'authenticated') return true;
    return route.access_level === user.role;
  };

  const getAccessibleRoutes = (): Route[] => {
    return routes.filter(route => isRouteAccessible(route));
  };

  return {
    routes,
    loading,
    error,
    getNavigationRoutes,
    getRouteByPath,
    isRouteAccessible,
    getAccessibleRoutes,
    refetch: fetchRoutes
  };
};