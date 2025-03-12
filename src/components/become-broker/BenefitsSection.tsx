
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, HomeIcon, ShieldCheck, Users } from 'lucide-react';

const benefitItems = [
  {
    icon: DollarSign,
    title: "Earn Competitive Commissions",
    description: "Earn up to 5% commission on every successful property or vehicle transaction"
  },
  {
    icon: Users,
    title: "Access to Client Network",
    description: "Connect with thousands of potential clients looking for property and vehicles"
  },
  {
    icon: HomeIcon,
    title: "Flexible Work Schedule",
    description: "Work when and where you want, be your own boss"
  },
  {
    icon: ShieldCheck,
    title: "Verified Broker Status",
    description: "Gain trust with our verified broker badge and priority listing"
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-dalali-800 mb-4">
        Benefits of Being a Broker
      </h2>
      <div className="space-y-4">
        {benefitItems.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-white p-4 rounded-xl shadow-sm flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-dalali-50 rounded-full flex items-center justify-center mr-4">
              <item.icon size={24} className="text-dalali-600" />
            </div>
            <div>
              <h3 className="font-medium text-dalali-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
