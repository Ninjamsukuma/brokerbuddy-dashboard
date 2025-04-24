
import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '@/components/ui/NavigationBar';

const BrokerProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar title="Broker Profile" />
      <main className="container mx-auto px-4 py-6">
        <h1>Broker Profile</h1>
        <p>Broker ID: {id}</p>
        {/* Add content here */}
      </main>
    </div>
  );
};

export default BrokerProfile;
