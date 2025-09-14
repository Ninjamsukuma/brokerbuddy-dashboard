-- Fix function search path security issues
-- Update calculate_distance function with proper search path
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 DECIMAL(10,8),
    lon1 DECIMAL(11,8),  
    lat2 DECIMAL(10,8),
    lon2 DECIMAL(11,8)
) RETURNS DECIMAL AS $$
DECLARE
    dlat DECIMAL;
    dlon DECIMAL;
    a DECIMAL;
    c DECIMAL;
    r DECIMAL := 6371; -- Earth's radius in kilometers
BEGIN
    dlat := radians(lat2 - lat1);
    dlon := radians(lon2 - lon1);
    a := sin(dlat/2) * sin(dlat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2) * sin(dlon/2);
    c := 2 * asin(sqrt(a));
    RETURN r * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT SECURITY DEFINER SET search_path = public;

-- Update get_nearby_brokers function with proper search path
CREATE OR REPLACE FUNCTION get_nearby_brokers(
    user_lat DECIMAL(10,8),
    user_lng DECIMAL(11,8),
    radius_km INTEGER DEFAULT 10,
    category_filter UUID DEFAULT NULL
)
RETURNS TABLE (
    broker_id UUID,
    broker_name TEXT,
    service_title TEXT,
    distance_km DECIMAL,
    rating DECIMAL(3,2),
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bs.broker_id,
        p.full_name as broker_name,
        bs.title as service_title,
        calculate_distance(user_lat, user_lng, bs.latitude, bs.longitude) as distance_km,
        calculate_broker_rating(bs.broker_id) as rating,
        bs.price_min,
        bs.price_max
    FROM broker_services bs
    JOIN profiles p ON p.user_id = bs.broker_id
    WHERE bs.is_active = true
        AND bs.latitude IS NOT NULL 
        AND bs.longitude IS NOT NULL
        AND calculate_distance(user_lat, user_lng, bs.latitude, bs.longitude) <= radius_km
        AND (category_filter IS NULL OR bs.category_id = category_filter)
    ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;