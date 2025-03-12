
import React from 'react';
import { motion } from 'framer-motion';

const statItems = [
  { value: "5K+", label: "Active Brokers" },
  { value: "10K+", label: "Transactions" },
  { value: "₹500M+", label: "Total Revenue" }
];

const StatsSection: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-3 gap-3 bg-dalali-50 rounded-xl p-6">
        {statItems.map((stat, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
          >
            <p className="text-2xl font-bold text-dalali-700">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
