-- Create enum for route access levels
CREATE TYPE public.route_access AS ENUM ('public', 'authenticated', 'client', 'broker', 'admin');

-- Create routes table to store all app routes
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  component TEXT NOT NULL,
  access_level route_access NOT NULL DEFAULT 'public',
  parent_route_id UUID REFERENCES public.routes(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_priority INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  is_navigation_item BOOLEAN NOT NULL DEFAULT false,
  redirect_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on routes table
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

-- Create policies for routes table
CREATE POLICY "Anyone can view active routes" 
ON public.routes 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage routes" 
ON public.routes 
FOR ALL
USING (false); -- Will be updated when admin role is implemented

-- Insert existing routes into the table
INSERT INTO public.routes (path, name, title, description, component, access_level, is_navigation_item, icon, order_priority) VALUES
('/', 'home', 'Home', 'Main dashboard for clients', 'Index', 'authenticated', true, 'home', 1),
('/login', 'login', 'Login', 'User login page', 'Login', 'public', false, 'log-in', 0),
('/signup', 'signup', 'Sign Up', 'User registration page', 'Signup', 'public', false, 'user-plus', 0),
('/language-selection', 'language-selection', 'Language Selection', 'Choose app language', 'LanguageSelection', 'public', false, 'globe', 0),
('/permissions', 'permissions', 'Permissions', 'App permissions setup', 'PermissionsRequest', 'public', false, 'shield-check', 0),
('/otp-verification', 'otp-verification', 'OTP Verification', 'Verify phone number', 'OTPVerification', 'public', false, 'smartphone', 0),

-- Broker routes
('/broker-dashboard', 'broker-dashboard', 'Broker Dashboard', 'Main broker control panel', 'BrokerDashboard', 'broker', true, 'layout-dashboard', 2),
('/become-broker', 'become-broker', 'Become a Broker', 'Broker registration process', 'BecomeBroker', 'public', true, 'briefcase', 8),

-- Client routes  
('/find-broker', 'find-broker', 'Find Broker', 'Search and find brokers', 'FindBroker', 'authenticated', true, 'search', 3),
('/nearby-brokers', 'nearby-brokers', 'Nearby Brokers', 'Find brokers near you', 'NearbyBrokers', 'authenticated', true, 'map-pin', 4),
('/book-broker', 'book-broker', 'Book Broker', 'Book a broker service', 'BookBroker', 'authenticated', false, 'calendar', 0),
('/broker-profile', 'broker-profile', 'Broker Profile', 'View broker details', 'BrokerProfile', 'authenticated', false, 'user', 0),

-- Shared routes
('/messages', 'messages', 'Messages', 'Chat and communications', 'Messages', 'authenticated', true, 'message-circle', 5),
('/requests', 'requests', 'Requests', 'Service requests', 'Requests', 'authenticated', true, 'file-text', 6),
('/profile', 'profile', 'Profile', 'User profile settings', 'Profile', 'authenticated', true, 'user', 7),
('/marketing-materials', 'marketing-materials', 'Marketing Materials', 'Broker marketing tools', 'MarketingMaterials', 'broker', false, 'megaphone', 0),
('/not-found', 'not-found', 'Page Not Found', '404 error page', 'NotFound', 'public', false, 'alert-circle', 0);

-- Create trigger for updating timestamps
CREATE TRIGGER update_routes_updated_at
BEFORE UPDATE ON public.routes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get user accessible routes
CREATE OR REPLACE FUNCTION public.get_user_routes(user_role TEXT DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  path TEXT,
  name TEXT,
  title TEXT,
  description TEXT,
  component TEXT,
  access_level route_access,
  parent_route_id UUID,
  is_navigation_item BOOLEAN,
  icon TEXT,
  order_priority INTEGER,
  redirect_path TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    r.id,
    r.path,
    r.name,
    r.title,
    r.description,
    r.component,
    r.access_level,
    r.parent_route_id,
    r.is_navigation_item,
    r.icon,
    r.order_priority,
    r.redirect_path
  FROM public.routes r
  WHERE r.is_active = true
    AND (
      r.access_level = 'public' OR
      (user_role IS NOT NULL AND (
        r.access_level = 'authenticated' OR
        r.access_level::text = user_role
      ))
    )
  ORDER BY r.order_priority ASC, r.title ASC;
$$;