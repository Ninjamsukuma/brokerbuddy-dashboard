
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, ChevronRight, DollarSign, HomeIcon, MessageSquare, ShieldCheck, Star, Users } from 'lucide-react';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const BecomeBroker = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in or create an account to become a broker",
        duration: 3000,
      });
      navigate('/signup');
      return;
    }
    
    // If user is already logged in, direct them to registration form
    setIsRegistering(true);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful",
      description: "Your broker application has been submitted for review",
      duration: 3000,
    });
    navigate('/broker-dashboard');
  };

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

  const statItems = [
    { value: "5K+", label: "Active Brokers" },
    { value: "10K+", label: "Transactions" },
    { value: "₹500M+", label: "Total Revenue" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Become a Broker" showSearch={false} />
      
      <main className="px-4 pb-4">
        {!isRegistering ? (
          <>
            {/* Hero Section */}
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
                  onClick={handleRegister}
                >
                  Register as Broker
                </button>
              </motion.div>
            </section>
            
            {/* Stats Section */}
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
            
            {/* Benefits Section */}
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
            
            {/* How It Works Section */}
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
            
            {/* Testimonials Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-dalali-800 mb-4">
                What Our Brokers Say
              </h2>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Testimonial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Mwangi</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Joining Dalali Kiganjani was the best career decision I've made. The platform makes it easy to connect with clients, and I've doubled my income in just 6 months!"
                </p>
              </div>
            </section>
            
            {/* CTA Section */}
            <section className="mb-8">
              <div className="bg-dalali-600 text-white p-6 rounded-xl text-center">
                <h2 className="text-xl font-bold mb-2">Ready to Start Earning?</h2>
                <p className="mb-4">Join our community of successful brokers today</p>
                <button 
                  className="bg-white text-dalali-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={handleRegister}
                >
                  Become a Broker Now
                </button>
              </div>
            </section>
          </>
        ) : (
          <section className="mt-4">
            <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-dalali-800 mb-4">
                Complete Your Broker Registration
              </h2>
              
              <form onSubmit={handleSubmitRegistration} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Title
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Real Estate Consultant"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none">
                    <option value="">Select your specialization</option>
                    <option value="residential">Residential Properties</option>
                    <option value="commercial">Commercial Properties</option>
                    <option value="land">Land</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="machinery">Machinery & Equipment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input 
                    type="number"
                    min="0"
                    placeholder="Years of experience"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Areas
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Nairobi, Mombasa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Tell clients about yourself and your expertise"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID/Passport Number
                  </label>
                  <input 
                    type="text"
                    placeholder="For verification purposes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                  />
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="terms"
                    className="mr-2 h-4 w-4 text-dalali-600 focus:ring-dalali-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors"
                >
                  Complete Registration
                </button>
              </form>
            </div>
          </section>
        )}
        
        {/* Happy Broker Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=350&q=80"
            alt="Happy broker earning money" 
            className="w-full h-48 object-cover"
          />
          <div className="bg-white p-4">
            <h3 className="font-medium text-dalali-800">Success on Your Terms</h3>
            <p className="text-sm text-gray-600">Join thousands of brokers building successful careers with Dalali Kiganjani</p>
          </div>
        </div>
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default BecomeBroker;
