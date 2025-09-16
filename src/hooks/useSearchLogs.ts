import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SearchLog {
  id: string;
  user_id?: string;
  search_query?: string;
  filters?: any;
  results_count?: number;
  clicked_result_id?: string;
  created_at: string;
}

export const useSearchLogs = () => {
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const logSearch = async (searchData: {
    search_query?: string;
    filters?: any;
    results_count?: number;
    clicked_result_id?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('search_logs')
        .insert([{
          ...searchData,
          user_id: user?.id || null, // Allow anonymous searches
        }])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (err: any) {
      console.error('Error logging search:', err);
      // Don't throw here - search logging shouldn't break the app
    }
  };

  const fetchUserSearchHistory = async () => {
    if (!user) {
      setSearchLogs([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('search_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setSearchLogs(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPopularSearches = async (limit: number = 10) => {
    try {
      const { data, error } = await supabase
        .from('search_logs')
        .select('search_query')
        .not('search_query', 'is', null)
        .neq('search_query', '')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Count frequency of search queries
      const queryCount = (data || []).reduce((acc: Record<string, number>, log) => {
        const query = log.search_query?.toLowerCase().trim();
        if (query) {
          acc[query] = (acc[query] || 0) + 1;
        }
        return acc;
      }, {});

      // Sort by frequency and return top queries
      return Object.entries(queryCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([query, count]) => ({ query, count }));
    } catch (err: any) {
      console.error('Error fetching popular searches:', err);
      return [];
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserSearchHistory();
    }
  }, [user]);

  return {
    searchLogs,
    loading,
    error,
    logSearch,
    fetchUserSearchHistory,
    getPopularSearches
  };
};