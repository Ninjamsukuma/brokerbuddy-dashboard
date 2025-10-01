import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeUpdates } from './useRealtimeUpdates';

export interface BrokerService {
  id: string;
  title: string;
  description: string;
  price_min: number;
  price_max: number;
  price_type: string;
  location: string;
  latitude: number;
  longitude: number;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  broker_id: string;
  availability_schedule: any;
}

export interface BrokerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  distance: string;
  specialties: string[];
  verified: boolean;
  online: boolean;
  priceLevel: 'low' | 'medium' | 'high';
  broker_id: string;
  service_title: string;
  price_min: number;
  price_max: number;
}

export const useBrokerServices = (filters?: {
  category?: string;
  location?: string;
  radius?: number;
  userLat?: number;
  userLng?: number;
}) => {
  const [services, setServices] = useState<BrokerService[]>([]);
  const [brokers, setBrokers] = useState<BrokerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch broker services with profile data
      const { data: servicesData, error: servicesError } = await supabase
        .from('broker_services')
        .select(`
          *,
          profiles!broker_services_broker_id_fkey (
            full_name,
            avatar_url,
            user_id
          )
        `)
        .eq('is_active', true);

      if (servicesError) throw servicesError;

      setServices(servicesData || []);

      // Transform services data to broker profiles format
      const brokerProfiles: BrokerProfile[] = (servicesData || []).map((service) => {
        const profile = service.profiles as any;
        const priceRange = service.price_max - service.price_min;
        const priceLevel: 'low' | 'medium' | 'high' = 
          priceRange < 100000 ? 'low' : priceRange < 1000000 ? 'medium' : 'high';

        return {
          id: service.id,
          broker_id: service.broker_id,
          name: profile?.full_name || 'Unknown Broker',
          avatar: profile?.avatar_url || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          rating: 4.5, // Will be calculated from reviews
          reviewCount: 0, // Will be fetched from reviews
          distance: '0 km', // Will be calculated if location provided
          specialties: [service.title],
          verified: true,
          online: true,
          priceLevel,
          service_title: service.title,
          price_min: service.price_min,
          price_max: service.price_max,
        };
      });

      setBrokers(brokerProfiles);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyBrokers = async (userLat: number, userLng: number, radius: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.rpc('get_nearby_brokers', {
        user_lat: userLat,
        user_lng: userLng,
        radius_km: radius,
        category_filter: filters?.category || null
      });

      if (error) throw error;

      const nearbyBrokers: BrokerProfile[] = (data || []).map((broker: any) => ({
        id: broker.broker_id,
        broker_id: broker.broker_id,
        name: broker.broker_name,
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: broker.rating || 4.5,
        reviewCount: 0,
        distance: `${broker.distance_km?.toFixed(1)} km`,
        specialties: [broker.service_title],
        verified: true,
        online: true,
        priceLevel: broker.price_min < 100000 ? 'low' : broker.price_min < 1000000 ? 'medium' : 'high',
        service_title: broker.service_title,
        price_min: broker.price_min,
        price_max: broker.price_max,
      }));

      setBrokers(nearbyBrokers);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Set up realtime updates
  useRealtimeUpdates(
    'broker_services',
    () => fetchServices(), // On insert, refetch data
    () => fetchServices(), // On update, refetch data
    () => fetchServices()  // On delete, refetch data
  );

  useEffect(() => {
    if (filters?.userLat && filters?.userLng) {
      fetchNearbyBrokers(filters.userLat, filters.userLng, filters.radius);
    } else {
      fetchServices();
    }
  }, [filters]);

  return {
    services,
    brokers,
    loading,
    error,
    refetch: fetchServices,
    fetchNearbyBrokers
  };
};

export const useBrokerOwnServices = () => {
  const [services, setServices] = useState<BrokerService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOwnServices = async () => {
    if (!user) {
      setServices([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('broker_services')
        .select('*')
        .eq('broker_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setServices(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: {
    title: string;
    description?: string;
    price_min?: number;
    price_max?: number;
    price_type?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    category_id: string;
    availability_schedule?: any;
  }) => {
    if (!user) throw new Error('Must be logged in');

    try {
      const { data, error } = await supabase
        .from('broker_services')
        .insert({
          ...serviceData,
          broker_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      await fetchOwnServices(); // Refresh the list
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateService = async (id: string, updates: Partial<BrokerService>) => {
    try {
      const { data, error } = await supabase
        .from('broker_services')
        .update(updates)
        .eq('id', id)
        .eq('broker_id', user?.id) // Ensure user can only update their own services
        .select()
        .single();

      if (error) throw error;

      await fetchOwnServices(); // Refresh the list
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('broker_services')
        .delete()
        .eq('id', id)
        .eq('broker_id', user?.id); // Ensure user can only delete their own services

      if (error) throw error;

      await fetchOwnServices(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchOwnServices();
  }, [user]);

  return {
    services,
    loading,
    error,
    refetch: fetchOwnServices,
    createService,
    updateService,
    deleteService
  };
};