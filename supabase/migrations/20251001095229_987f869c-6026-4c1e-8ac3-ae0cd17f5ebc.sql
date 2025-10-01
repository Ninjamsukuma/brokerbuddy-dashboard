-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('client', 'broker');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create service categories table
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON public.service_categories FOR SELECT USING (true);

-- Create broker_services table
CREATE TABLE public.broker_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price_min NUMERIC(10,2) DEFAULT 0,
  price_max NUMERIC(10,2) DEFAULT 0,
  price_type TEXT DEFAULT 'fixed',
  location TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  category_id UUID REFERENCES public.service_categories(id),
  is_active BOOLEAN DEFAULT true,
  availability_schedule JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.broker_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services" ON public.broker_services FOR SELECT USING (is_active = true);
CREATE POLICY "Brokers can manage own services" ON public.broker_services FOR ALL USING (auth.uid() = broker_id);

-- Create service_requests table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  client_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  broker_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.broker_services(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requested_date TIMESTAMPTZ,
  client_location TEXT,
  client_latitude NUMERIC(10,7),
  client_longitude NUMERIC(10,7),
  proposed_price NUMERIC(10,2),
  broker_response TEXT,
  accepted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own requests" ON public.service_requests FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Brokers can view requests for them" ON public.service_requests FOR SELECT USING (auth.uid() = broker_id);
CREATE POLICY "Clients can create requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update own requests" ON public.service_requests FOR UPDATE USING (auth.uid() = client_id);
CREATE POLICY "Brokers can update requests for them" ON public.service_requests FOR UPDATE USING (auth.uid() = broker_id);
CREATE POLICY "Clients can delete own requests" ON public.service_requests FOR DELETE USING (auth.uid() = client_id);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  reviewed_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- Create search_logs table
CREATE TABLE public.search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  search_query TEXT,
  filters JSONB,
  results_count INTEGER,
  clicked_result_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own search logs" ON public.search_logs FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can insert search logs" ON public.search_logs FOR INSERT WITH CHECK (true);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  access_level TEXT NOT NULL DEFAULT 'public',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view routes" ON public.routes FOR SELECT USING (true);

-- Insert default routes
INSERT INTO public.routes (path, access_level) VALUES
  ('/', 'public'),
  ('/login', 'public'),
  ('/signup', 'public'),
  ('/language-selection', 'public'),
  ('/permissions-request', 'public'),
  ('/otp-verification', 'public'),
  ('/become-broker', 'public'),
  ('/find-broker', 'client'),
  ('/nearby-brokers', 'client'),
  ('/book-broker', 'client'),
  ('/broker-profile', 'public'),
  ('/broker-dashboard', 'broker'),
  ('/profile', 'authenticated'),
  ('/messages', 'authenticated'),
  ('/requests', 'authenticated'),
  ('/marketing-materials', 'broker');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_broker_services_updated_at BEFORE UPDATE ON public.broker_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate broker rating
CREATE OR REPLACE FUNCTION public.calculate_broker_rating(broker_user_id UUID)
RETURNS NUMERIC AS $$
  SELECT COALESCE(AVG(rating), 0)
  FROM public.reviews
  WHERE reviewed_id = broker_user_id;
$$ LANGUAGE SQL STABLE;

-- Create function to get nearby brokers
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
) AS $$
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
$$ LANGUAGE plpgsql STABLE;

-- Create function to get user routes
CREATE OR REPLACE FUNCTION public.get_user_routes(user_role TEXT)
RETURNS TABLE (path TEXT, access_level TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT r.path, r.access_level
  FROM public.routes r
  WHERE r.access_level = 'public'
    OR r.access_level = 'authenticated'
    OR r.access_level = user_role;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email'),
    NEW.phone,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.broker_services REPLICA IDENTITY FULL;
ALTER TABLE public.service_requests REPLICA IDENTITY FULL;
ALTER TABLE public.reviews REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.broker_services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;