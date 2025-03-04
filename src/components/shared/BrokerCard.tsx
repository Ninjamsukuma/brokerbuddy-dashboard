
import React from 'react';
import { Star, MapPin, Shield, MessageSquare } from 'lucide-react';

export interface BrokerProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  distance: string;
  specialties: string[];
  verified: boolean;
  online: boolean;
}

const BrokerCard: React.FC<{ broker: BrokerProps; featured?: boolean }> = ({ 
  broker, 
  featured = false 
}) => {
  return (
    <div className={`relative rounded-xl overflow-hidden bg-white shadow-sm animate-scale-up card-hover ${featured ? 'border border-dalali-100' : ''}`}>
      <div className="absolute top-2 right-2 z-10">
        {broker.verified && (
          <div className="chip bg-dalali-600 text-white mb-1">
            <Shield size={12} className="mr-1" />
            Verified
          </div>
        )}
        <div className={`chip ${broker.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          <span className={`w-2 h-2 rounded-full ${broker.online ? 'bg-green-500' : 'bg-gray-400'} mr-1`}></span>
          {broker.online ? 'Online' : 'Offline'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img 
                src={broker.avatar} 
                alt={broker.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="font-semibold text-dalali-800 text-lg">{broker.name}</h3>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-500 mr-1">
                <Star size={16} className="fill-current" />
                <span className="ml-1 text-sm font-medium">{broker.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-500">({broker.reviewCount} reviews)</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-xs mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{broker.distance} away</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {broker.specialties.map((specialty) => (
              <span key={specialty} className="chip bg-dalali-50 text-dalali-700">
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button className="flex-1 bg-dalali-600 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm transition-all hover:bg-dalali-700 active:scale-[0.98]">
              Contact
            </button>
            <button className="icon-button">
              <MessageSquare size={18} className="text-dalali-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerCard;
