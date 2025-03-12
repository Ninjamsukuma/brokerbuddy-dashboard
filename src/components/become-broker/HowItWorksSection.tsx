
import React from 'react';
import { motion } from 'framer-motion';

const stepItems = [
  {
    number: 1,
    title: "Create an Account",
    description: "Sign up as a broker on our platform"
  },
  {
    number: 2,
    title: "Complete Your Profile",
    description: "Add your professional details and areas of expertise"
  },
  {
    number: 3,
    title: "Get Verified",
    description: "Submit documents for verification to earn the trusted badge"
  },
  {
    number: 4,
    title: "Start Earning",
    description: "Create listings and respond to client requests"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-dalali-800 mb-4">
        How It Works
      </h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-dalali-100"></div>
        <div className="space-y-6">
          {stepItems.map((step, index) => (
            <motion.div 
              key={index}
              className="relative pl-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <div className="absolute left-0 w-12 h-12 rounded-full bg-dalali-600 text-white flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <h3 className="font-medium text-dalali-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
