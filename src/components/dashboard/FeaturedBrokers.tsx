
import React from 'react';
import BrokerCard, { BrokerProps } from '../shared/BrokerCard';
import { useBrokerServices } from '@/hooks/useBrokerServices';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const FeaturedBrokers: React.FC = () => {
  const { brokers, loading, error } = useBrokerServices();

  // Get top 3 brokers based on rating
  const featuredBrokers = brokers
    .filter(broker => broker.rating >= 4.0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="w-full mt-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || featuredBrokers.length === 0) {
    return (
      <div className="w-full mt-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-dalali-800">Top Brokers</h2>
          <a href="/find-broker" className="text-dalali-600 text-sm font-medium">
            View All
          </a>
        </div>
        <div className="p-6 text-center text-muted-foreground">
          <p>No featured brokers available at the moment.</p>
          <a href="/find-broker" className="text-primary hover:underline">Browse all brokers</a>
        </div>
      </div>
    );
  }

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
