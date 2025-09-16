import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Review {
  id: string;
  service_request_id: string;
  reviewer_id: string;
  reviewed_id: string;
  rating: number;
  review_text?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  // Joined data
  reviewer_profile?: {
    full_name: string;
    avatar_url?: string;
  };
  reviewed_profile?: {
    full_name: string;
    avatar_url?: string;
  };
  service_request?: {
    title: string;
    service?: {
      title: string;
    };
  };
}

export const useReviews = (targetUserId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('reviews')
        .select(`
          *,
          reviewer_profile:profiles!reviews_reviewer_id_fkey (
            full_name,
            avatar_url
          ),
          reviewed_profile:profiles!reviews_reviewed_id_fkey (
            full_name,
            avatar_url
          ),
          service_request:service_requests!reviews_service_request_id_fkey (
            title,
            service:broker_services!service_requests_service_id_fkey (
              title
            )
          )
        `);

      // Filter reviews based on target user
      if (targetUserId) {
        query = query.eq('reviewed_id', targetUserId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: {
    service_request_id: string;
    reviewed_id: string;
    rating: number;
    review_text?: string;
    is_anonymous?: boolean;
  }) => {
    if (!user) throw new Error('Must be logged in to create a review');

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          ...reviewData,
          reviewer_id: user.id,
          is_anonymous: reviewData.is_anonymous || false
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchReviews(); // Refresh the list
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateReview = async (id: string, updates: {
    rating?: number;
    review_text?: string;
    is_anonymous?: boolean;
  }) => {
    if (!user) throw new Error('Must be logged in');

    try {
      const { data, error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id)
        .eq('reviewer_id', user.id) // Ensure user can only update their own reviews
        .select()
        .single();

      if (error) throw error;

      await fetchReviews(); // Refresh the list
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const getBrokerRating = async (brokerId: string) => {
    try {
      const { data, error } = await supabase.rpc('calculate_broker_rating', {
        broker_user_id: brokerId
      });

      if (error) throw error;

      return data || 0;
    } catch (err: any) {
      console.error('Error calculating broker rating:', err);
      return 0;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [targetUserId]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
    createReview,
    updateReview,
    getBrokerRating
  };
};

export const useUserReviews = () => {
  const { user } = useAuth();
  return useReviews(user?.id);
};