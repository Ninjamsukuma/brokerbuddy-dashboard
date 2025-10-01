-- Fix security warnings by setting search_path on functions

-- Update calculate_broker_rating function
CREATE OR REPLACE FUNCTION public.calculate_broker_rating(broker_user_id UUID)
RETURNS NUMERIC 
LANGUAGE SQL 
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(AVG(rating), 0)
  FROM public.reviews
  WHERE reviewed_id = broker_user_id;
$$;

-- Update get_nearby_brokers function
CREATE OR REPLACE FUNCTION public.get_nearby_brokers(
  user_lat NUMERIC,
  user_lng NUMERIC,
  radius_km NUMERIC DEFAULT 10,
  category_filter UUID DEFAULT NULL
)
RETURNS TABLE (
  broker_id UUID,
  broker_name TEXT,
  service_title TEXT,
  distance_km NUMERIC,
  rating NUMERIC,
  price_min NUMERIC,
  price_max NUMERIC
) 
LANGUAGE plpgsql 
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bs.broker_id,
    p.full_name as broker_name,
    bs.title as service_title,
    (6371 * acos(
      cos(radians(user_lat)) * cos(radians(bs.latitude)) *
      cos(radians(bs.longitude) - radians(user_lng)) +
      sin(radians(user_lat)) * sin(radians(bs.latitude))
    )) as distance_km,
    public.calculate_broker_rating(bs.broker_id) as rating,
    bs.price_min,
    bs.price_max
  FROM public.broker_services bs
  JOIN public.profiles p ON p.user_id = bs.broker_id
  WHERE bs.is_active = true
    AND bs.latitude IS NOT NULL
    AND bs.longitude IS NOT NULL
    AND (category_filter IS NULL OR bs.category_id = category_filter)
    AND (6371 * acos(
      cos(radians(user_lat)) * cos(radians(bs.latitude)) *
      cos(radians(bs.longitude) - radians(user_lng)) +
      sin(radians(user_lat)) * sin(radians(bs.latitude))
    )) <= radius_km
  ORDER BY distance_km;
END;
$$;

-- Update get_user_routes function
CREATE OR REPLACE FUNCTION public.get_user_routes(user_role TEXT)
RETURNS TABLE (path TEXT, access_level TEXT)
LANGUAGE plpgsql 
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT r.path, r.access_level
  FROM public.routes r
  WHERE r.access_level = 'public'
    OR r.access_level = 'authenticated'
    OR r.access_level = user_role;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;