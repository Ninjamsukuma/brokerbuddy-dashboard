
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Loader } from 'lucide-react';

// This is a placeholder component for the map
// In a real implementation, you would integrate with Google Maps or Mapbox
const MapView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mt-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-dalali-800">Nearby Brokers</h2>
        <a href="/find-broker?map=true" className="text-dalali-600 text-sm font-medium">
          Expand Map
        </a>
      </div>
      
      <div className="relative bg-dalali-50 rounded-xl overflow-hidden shadow-sm h-56">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <Loader size={24} className="text-dalali-600 animate-spin" />
            <span className="ml-2 text-dalali-600 font-medium">Loading map...</span>
          </div>
        ) : (
          <>
            <div 
              ref={mapRef} 
              className="h-full w-full"
              style={{
                backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/39.2083,6.7716,12,0/500x300?access_token=pk.eyJ1IjoiZXhhbXBsZWFwaSIsImEiOiJjbHJsZzJ2MzkwMmJmMmpxcXgwYTM3cDl4In0.QTNLkYLkJxw5FPlZ6mSIKQ')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Map elements would be dynamically added here in a real implementation */}
            </div>
            
            {/* Broker markers (static for demonstration) */}
            <div className="absolute top-1/4 left-1/3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-dalali-600 flex items-center justify-center border-2 border-white shadow-md">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white"></span>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-2/3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-dalali-600 flex items-center justify-center border-2 border-white shadow-md">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white"></span>
              </div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-white shadow-md">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 rounded-full border border-white"></span>
              </div>
            </div>
            
            {/* User's current location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white shadow-lg">
                <Navigation size={20} className="text-white" />
              </div>
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
            </div>
            
            {/* Map controls (static for demonstration) */}
            <div className="absolute bottom-3 right-3 flex flex-col space-y-2">
              <button className="icon-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20V12M12 12V4M12 12H4M12 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="icon-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12H20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MapView;
