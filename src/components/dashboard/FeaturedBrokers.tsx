
import React from 'react';
import BrokerCard, { BrokerProps } from '../shared/BrokerCard';

// Mock data for featured brokers
const featuredBrokers: BrokerProps[] = [
  {
    id: '1',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    reviewCount: 124,
    distance: '1.2 km',
    specialties: ['Real Estate', 'Apartments'],
    verified: true,
    online: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    reviewCount: 89,
    distance: '3.5 km',
    specialties: ['Car Sales', 'Financing'],
    verified: true,
    online: true
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.5,
    reviewCount: 67,
    distance: '2.8 km',
    specialties: ['Land', 'Commercial'],
    verified: false,
    online: false
  }
];

const FeaturedBrokers: React.FC = () => {
  return (
    <div className="w-full mt-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-dalali-800">Top Brokers</h2>
        <a href="/find-broker" className="text-dalali-600 text-sm font-medium">
          View All
        </a>
      </div>
      
      <div className="space-y-4">
        {featuredBrokers.map((broker, index) => (
          <div key={broker.id} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            <BrokerCard broker={broker} featured />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBrokers;
