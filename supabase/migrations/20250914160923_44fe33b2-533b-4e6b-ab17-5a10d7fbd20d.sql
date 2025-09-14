-- Create enums for various status types
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE document_type AS ENUM ('id_card', 'passport', 'license', 'certificate', 'other');
CREATE TYPE message_type AS ENUM ('text', 'image', 'document', 'location');

-- KYC Documents table
CREATE TABLE kyc_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    document_url TEXT NOT NULL,
    document_name TEXT,
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Service Categories table
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Broker Services table
CREATE TABLE broker_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    broker_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES service_categories(id),
    title TEXT NOT NULL,
    description TEXT,
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2),
    price_type TEXT DEFAULT 'fixed', -- fixed, hourly, negotiable
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    availability_schedule JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Service Images table
CREATE TABLE service_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES broker_services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_name TEXT,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Broker Locations table (for real-time tracking)
CREATE TABLE broker_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    broker_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    is_current BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Service Requests table
CREATE TABLE service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    broker_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES broker_services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    requested_date TIMESTAMP WITH TIME ZONE,
    proposed_price DECIMAL(10,2),
    client_location TEXT,
    client_latitude DECIMAL(10, 8),
    client_longitude DECIMAL(11, 8),
    status booking_status DEFAULT 'pending',
    broker_response TEXT,
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_request_id UUID REFERENCES service_requests(id) ON DELETE CASCADE,
    participant_ids UUID[] NOT NULL,
    last_message_id UUID,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    message_type message_type DEFAULT 'text',
    content TEXT,
    file_url TEXT,
    file_name TEXT,
    file_size INTEGER,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_request_id UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    reviewed_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(service_request_id, reviewer_id)
);

-- Search Logs table (for analytics)
CREATE TABLE search_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
    search_query TEXT,
    filters JSONB,
    results_count INTEGER,
    clicked_result_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default service categories
INSERT INTO service_categories (name, description, icon) VALUES
('Real Estate', 'Property sales, rentals, and consultations', 'home'),
('Car Sales', 'Vehicle sales and automotive services', 'car'),
('Rentals', 'Property and equipment rental services', 'key'),
('Legal Services', 'Legal consultation and documentation', 'scale'),
('Financial Services', 'Loans, insurance, and financial planning', 'dollar-sign'),
('Construction', 'Building and renovation services', 'hammer'),
('Business Consulting', 'Business advisory and consulting', 'briefcase');

-- Enable RLS on all tables
ALTER TABLE kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for KYC Documents
CREATE POLICY "Users can view their own documents" ON kyc_documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" ON kyc_documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" ON kyc_documents
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Service Categories
CREATE POLICY "Anyone can view active categories" ON service_categories
    FOR SELECT USING (is_active = true);

-- RLS Policies for Broker Services
CREATE POLICY "Anyone can view active services" ON broker_services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Brokers can manage their own services" ON broker_services
    FOR ALL USING (auth.uid() = broker_id);

-- RLS Policies for Service Images
CREATE POLICY "Anyone can view service images" ON service_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM broker_services bs 
            WHERE bs.id = service_images.service_id AND bs.is_active = true
        )
    );

CREATE POLICY "Brokers can manage their service images" ON service_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM broker_services bs 
            WHERE bs.id = service_images.service_id AND bs.broker_id = auth.uid()
        )
    );

-- RLS Policies for Broker Locations
CREATE POLICY "Brokers can manage their own locations" ON broker_locations
    FOR ALL USING (auth.uid() = broker_id);

CREATE POLICY "Anyone can view current broker locations" ON broker_locations
    FOR SELECT USING (is_current = true);

-- RLS Policies for Service Requests
CREATE POLICY "Users can view their own requests" ON service_requests
    FOR SELECT USING (auth.uid() = client_id OR auth.uid() = broker_id);

CREATE POLICY "Clients can create requests" ON service_requests
    FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Participants can update requests" ON service_requests
    FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = broker_id);

-- RLS Policies for Conversations
CREATE POLICY "Participants can view their conversations" ON conversations
    FOR SELECT USING (auth.uid() = ANY(participant_ids));

CREATE POLICY "Participants can create conversations" ON conversations
    FOR INSERT WITH CHECK (auth.uid() = ANY(participant_ids));

-- RLS Policies for Messages
CREATE POLICY "Conversation participants can view messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM conversations c 
            WHERE c.id = messages.conversation_id AND auth.uid() = ANY(c.participant_ids)
        )
    );

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM conversations c 
            WHERE c.id = conversation_id AND auth.uid() = ANY(c.participant_ids)
        )
    );

CREATE POLICY "Senders can update their messages" ON messages
    FOR UPDATE USING (auth.uid() = sender_id);

-- RLS Policies for Reviews
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for completed requests" ON reviews
    FOR INSERT WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM service_requests sr 
            WHERE sr.id = service_request_id 
            AND sr.status = 'completed'
            AND (sr.client_id = auth.uid() OR sr.broker_id = auth.uid())
        )
    );

CREATE POLICY "Reviewers can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = reviewer_id);

-- RLS Policies for Search Logs
CREATE POLICY "Users can view their own search logs" ON search_logs
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert search logs" ON search_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Add indexes for better performance
CREATE INDEX idx_kyc_documents_user_id ON kyc_documents(user_id);
CREATE INDEX idx_kyc_documents_status ON kyc_documents(verification_status);
CREATE INDEX idx_broker_services_broker_id ON broker_services(broker_id);
CREATE INDEX idx_broker_services_category_id ON broker_services(category_id);
CREATE INDEX idx_broker_services_location ON broker_services USING GIST (ll_to_earth(latitude, longitude)) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX idx_service_requests_client_id ON service_requests(client_id);
CREATE INDEX idx_service_requests_broker_id ON service_requests(broker_id);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_conversations_participants ON conversations USING GIN(participant_ids);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_reviews_reviewed_id ON reviews(reviewed_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_kyc_documents_updated_at
    BEFORE UPDATE ON kyc_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_broker_services_updated_at
    BEFORE UPDATE ON broker_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
    BEFORE UPDATE ON service_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update conversations last_message references
ALTER TABLE conversations 
ADD CONSTRAINT fk_conversations_last_message 
FOREIGN KEY (last_message_id) REFERENCES messages(id) ON DELETE SET NULL;

-- Function to calculate broker average rating
CREATE OR REPLACE FUNCTION calculate_broker_rating(broker_user_id UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
    avg_rating DECIMAL(3,2);
BEGIN
    SELECT ROUND(AVG(rating)::NUMERIC, 2) INTO avg_rating
    FROM reviews 
    WHERE reviewed_id = broker_user_id;
    
    RETURN COALESCE(avg_rating, 0.00);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Function to get nearby brokers
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
        earth_distance(ll_to_earth(user_lat, user_lng), ll_to_earth(bs.latitude, bs.longitude)) / 1000 as distance_km,
        calculate_broker_rating(bs.broker_id) as rating,
        bs.price_min,
        bs.price_max
    FROM broker_services bs
    JOIN profiles p ON p.user_id = bs.broker_id
    WHERE bs.is_active = true
        AND bs.latitude IS NOT NULL 
        AND bs.longitude IS NOT NULL
        AND earth_distance(ll_to_earth(user_lat, user_lng), ll_to_earth(bs.latitude, bs.longitude)) <= (radius_km * 1000)
        AND (category_filter IS NULL OR bs.category_id = category_filter)
    ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;