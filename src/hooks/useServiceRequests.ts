import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeUpdates } from './useRealtimeUpdates';

export type BookingStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  client_id: string;
  broker_id: string;
  service_id: string;
  status: BookingStatus;
  requested_date: string;
  client_location: string;
  client_latitude?: number;
  client_longitude?: number;
  proposed_price?: number;
  broker_response?: string;
  created_at: string;
  updated_at: string;
  accepted_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  // Joined data
  client_profile?: {
    full_name: string;
    avatar_url?: string;
  };
  broker_profile?: {
    full_name: string;
    avatar_url?: string;
  };
  service?: {
    title: string;
    price_min: number;
    price_max: number;
  };
}

export const useServiceRequests = (userRole?: 'client' | 'broker') => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchRequests = async () => {
    if (!user) {
      setRequests([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('service_requests')
        .select(`
          *,
          client_profile:profiles!service_requests_client_id_fkey (
            full_name,
            avatar_url
          ),
          broker_profile:profiles!service_requests_broker_id_fkey (
            full_name,
            avatar_url
          ),
          service:broker_services!service_requests_service_id_fkey (
            title,
            price_min,
            price_max
          )
        `);

      // Filter based on user role
      if (userRole === 'client' || (!userRole && user.role === 'client')) {
        query = query.eq('client_id', user.id);
      } else if (userRole === 'broker' || (!userRole && user.role === 'broker')) {
        query = query.eq('broker_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setRequests(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData: {
    title: string;
    description: string;
    service_id: string;
    broker_id: string;
    requested_date?: string;
    client_location?: string;
    client_latitude?: number;
    client_longitude?: number;
    proposed_price?: number;
  }) => {
    if (!user || user.role !== 'client') {
      throw new Error('Only clients can create requests');
    }

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          ...requestData,
          client_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      await fetchRequests(); // Refresh the list
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateRequestStatus = async (
    id: string, 
    status: BookingStatus, 
    additionalData?: {
      broker_response?: string;
      cancellation_reason?: string;
    }
  ) => {
    if (!user) throw new Error('Must be logged in');

    try {
      const updateData: any = { 
        status,
        ...additionalData
      };

      // Set timestamp fields based on status
      if (status === 'accepted') {
        updateData.accepted_at = new Date().toISOString();
      } else if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      } else if (status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('service_requests')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchRequests(); // Refresh the list
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRequest = async (id: string) => {
    if (!user) throw new Error('Must be logged in');

    try {
      const { error } = await supabase
        .from('service_requests')
        .delete()
        .eq('id', id)
        .eq('client_id', user.id); // Only clients can delete their own requests

      if (error) throw error;

      await fetchRequests(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Set up realtime updates
  useRealtimeUpdates(
    'service_requests',
    () => refetch(), // On insert, refetch data
    () => refetch(), // On update, refetch data
    () => refetch()  // On delete, refetch data
  );

  useEffect(() => {
    fetchRequests();
  }, [user, userRole]);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    createRequest,
    updateRequestStatus,
    deleteRequest
  };
};

// Transform service requests to match the Order interface for dashboard
export const transformRequestsToOrders = (requests: ServiceRequest[]) => {
  return requests.map(request => ({
    id: request.id,
    client: {
      name: request.client_profile?.full_name || 'Unknown Client',
      avatar: request.client_profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    property: {
      title: request.service?.title || request.title,
      type: 'Service Request',
      price: request.proposed_price ? 
        `${request.proposed_price.toLocaleString()} TZS` : 
        `${request.service?.price_min?.toLocaleString()} - ${request.service?.price_max?.toLocaleString()} TZS`,
      location: request.client_location || 'Location not specified',
    },
    status: request.status.replace('_', '-') as any,
    date: new Date(request.created_at).toLocaleDateString(),
    commission: request.status === 'completed' ? 
      `${((request.proposed_price || request.service?.price_min || 0) * 0.05).toLocaleString()} TZS` : 
      'Pending',
    rating: null,
    review: null,
  }));
};