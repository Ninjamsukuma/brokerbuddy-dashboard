
import React from 'react';
import NavigationBar from '@/components/ui/NavigationBar';

const NearbyBrokers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar title="Nearby Brokers" />
      <main className="container mx-auto px-4 py-6">
        <h1>Nearby Brokers</h1>
        {/* Add content here */}
      </main>
    </div>
  );
};

export default NearbyBrokers;
