
import React from 'react';
import NavigationBar from '@/components/ui/NavigationBar';

const BookBroker = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar title="Book a Broker" />
      <main className="container mx-auto px-4 py-6">
        <h1>Book a Broker</h1>
        {/* Add content here */}
      </main>
    </div>
  );
};

export default BookBroker;
