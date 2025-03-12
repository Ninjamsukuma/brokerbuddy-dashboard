
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onRegister: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRegister }) => {
  return (
    <section className="mt-4 mb-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dalali-800 mb-3">
          Become a Broker with Dalali Kiganjani
        </h1>
        <p className="text-gray-600 mb-6">
          Turn your expertise into income. Join our network of professional brokers
          and start earning on your own schedule.
        </p>
        <button 
          className="btn-primary px-8 py-3 rounded-lg text-white bg-dalali-600 font-semibold shadow-lg hover:bg-dalali-700 transition-colors"
          onClick={onRegister}
        >
          Register as Broker
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
