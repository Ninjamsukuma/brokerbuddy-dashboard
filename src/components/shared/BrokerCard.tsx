
import React from 'react';
import { Star, MapPin, Shield, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

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
  priceLevel?: 'low' | 'medium' | 'high';
}

const BrokerCard: React.FC<{ broker: BrokerProps; featured?: boolean }> = ({ 
  broker, 
  featured = false 
}) => {
  const navigate = useNavigate();

  const handleContact = () => {
    toast({
      title: "Contact Initiated",
      description: `Connecting you with ${broker.name}`,
      duration: 3000,
    });
    navigate(`/messages`);
  };

  const handleMessage = () => {
    toast({
      title: "Message",
      description: `Opening chat with ${broker.name}`,
      duration: 3000,
    });
    navigate(`/messages`);
  };

  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden bg-white shadow-sm card-hover ${featured ? 'border border-dalali-100' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-2 right-2 z-10">
        {broker.verified && (
          <motion.div 
            className="chip bg-dalali-600 text-white mb-1"
            whileHover={{ scale: 1.05 }}
          >
            <Shield size={12} className="mr-1" />
            Verified
          </motion.div>
        )}
        <motion.div 
          className={`chip ${broker.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
          whileHover={{ scale: 1.05 }}
        >
          <span className={`w-2 h-2 rounded-full ${broker.online ? 'bg-green-500' : 'bg-gray-400'} mr-1`}></span>
          {broker.online ? 'Online' : 'Offline'}
        </motion.div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="relative flex-shrink-0">
            <motion.div 
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm"
              whileHover={{ scale: 1.05, borderColor: "#e2e8f0" }}
            >
              <img 
                src={broker.avatar} 
                alt={broker.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
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
              <motion.span 
                key={specialty} 
                className="chip bg-dalali-50 text-dalali-700"
                whileHover={{ scale: 1.05, backgroundColor: "#e1effe" }}
              >
                {specialty}
              </motion.span>
            ))}
          </div>
          
          <div className="flex space-x-2 mt-4">
            <motion.button 
              className="flex-1 bg-dalali-600 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm hover:bg-dalali-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContact}
            >
              Contact
            </motion.button>
            <motion.button 
              className="icon-button"
              whileHover={{ scale: 1.1, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMessage}
            >
              <MessageSquare size={18} className="text-dalali-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrokerCard;
