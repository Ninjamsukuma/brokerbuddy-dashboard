
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/ui/NavigationBar';
import BottomTabs from '@/components/ui/BottomTabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import HeroSection from '@/components/become-broker/HeroSection';
import StatsSection from '@/components/become-broker/StatsSection';
import BenefitsSection from '@/components/become-broker/BenefitsSection';
import HowItWorksSection from '@/components/become-broker/HowItWorksSection';
import TestimonialSection from '@/components/become-broker/TestimonialSection';
import RegistrationForm from '@/components/become-broker/RegistrationForm';
import CTASection from '@/components/become-broker/CTASection';

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
    setIsRegistering(true);
  };
  
  const handleBack = () => {
    setIsRegistering(false);
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Become a Broker" showSearch={false} />
      
      <main className="px-4 pb-4">
        {!isRegistering ? (
          <>
            <HeroSection onRegister={handleRegister} />
            <StatsSection />
            <BenefitsSection />
            <HowItWorksSection />
            <TestimonialSection />
            <CTASection onRegister={handleRegister} />
            
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
          </>
        ) : (
          <RegistrationForm onSubmit={handleSubmitRegistration} onBack={handleBack} />
        )}
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default BecomeBroker;
