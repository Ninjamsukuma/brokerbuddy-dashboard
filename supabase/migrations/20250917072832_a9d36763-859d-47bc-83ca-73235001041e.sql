-- Update broker discovery routes to be client-only
-- Remove "Find Broker" and "Nearby Brokers" from broker navigation

UPDATE routes 
SET access_level = 'client'
WHERE path IN ('/find-broker', '/nearby-brokers');