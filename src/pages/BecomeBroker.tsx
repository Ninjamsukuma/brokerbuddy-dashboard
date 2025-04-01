import React, { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { LockKeyhole, User } from 'lucide-react';

const BecomeBroker = () => {
  const navigate = useNavigate();
  const { user, updateUserRole } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect to broker dashboard if user is a broker
  useEffect(() => {
    if (user?.role === 'broker') {
      setIsRedirecting(true);
      toast({
        title: "Broker Access",
        description: "You are already registered as a broker. Redirecting to your dashboard.",
        duration: 3000,
      });
      
      // Add a small delay for the toast to be visible
      const timer = setTimeout(() => {
        navigate('/broker-dashboard');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleRegister = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in or create an account to become a broker",
        duration: 3000,
      });
      // Don't navigate away, show login options instead
      return;
    }
    setIsRegistering(true);
  };
  
  const handleBack = () => {
    setIsRegistering(false);
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update user role to broker
      await updateUserRole('broker');
      
      toast({
        title: "Registration Successful",
        description: "Your broker application has been approved. Welcome to Dalali Kiganjani broker community!",
        duration: 3000,
      });
      
      // Add a small delay for the toast to be visible
      setTimeout(() => {
        navigate('/broker-dashboard');
      }, 1500);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error updating your account. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const navigateToLogin = () => {
    navigate('/login', { state: { returnUrl: '/become-broker' } });
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };
  
  // Show loading while redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-dalali-600 mb-4">You are already a broker. Redirecting to dashboard...</div>
        <div className="animate-spin h-8 w-8 border-4 border-dalali-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Become a Broker" showSearch={false} />
      
      <main className="px-4 pb-4">
        {!user && (
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <h2 className="text-lg font-semibold text-dalali-800 mb-3">Sign in to continue</h2>
            <p className="text-gray-600 text-sm mb-4">Please log in or create an account to become a broker</p>
            <div className="flex gap-3">
              <Button 
                onClick={navigateToLogin} 
                className="flex-1 bg-dalali-600 hover:bg-dalali-700"
              >
                <LockKeyhole size={16} className="mr-2" />
                Login
              </Button>
              <Button 
                onClick={navigateToSignup} 
                variant="outline" 
                className="flex-1 border-dalali-600 text-dalali-600 hover:bg-dalali-50"
              >
                <User size={16} className="mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        )}
        
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
