
import React from 'react';

interface CTASectionProps {
  onRegister: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRegister }) => {
  return (
    <section className="mb-8">
      <div className="bg-dalali-600 text-white p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-2">Ready to Start Earning?</h2>
        <p className="mb-4">Join our community of successful brokers today</p>
        <button 
          className="bg-white text-dalali-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onRegister}
        >
          Become a Broker Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;
