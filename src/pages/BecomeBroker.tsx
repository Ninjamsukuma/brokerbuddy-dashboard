
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
import LoginForm from '@/components/become-broker/LoginForm';
import CTASection from '@/components/become-broker/CTASection';
import { Button } from '@/components/ui/button';
import { 
  LockKeyhole, 
  User, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const BecomeBroker = () => {
  const navigate = useNavigate();
  const { user, updateUserRole } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'register' | 'login'>('info');

  // Redirect to broker landing if user is a broker
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
        navigate('/broker-landing');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleRegister = () => {
    if (!user) {
      setActiveTab('register');
      return;
    }
    
    // If user is already logged in but not a broker, show confirmation dialog
    if (user.role === 'client') {
      setShowConfirmDialog(true);
      return;
    }
    
    setIsRegistering(true);
  };
  
  const handleConfirmRoleChange = async () => {
    setIsProcessing(true);
    try {
      await updateUserRole('broker');
      setShowConfirmDialog(false);
      
      toast({
        title: "Role Updated",
        description: "Your account has been upgraded to broker status. Redirecting to your dashboard.",
        duration: 3000,
      });
      
      // Add a small delay for the toast to be visible
      setTimeout(() => {
        navigate('/broker-landing');
      }, 1500);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your account. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleBack = () => {
    setIsRegistering(false);
    setActiveTab('info');
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
        navigate('/broker-landing');
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
    setActiveTab('login');
  };

  const navigateToSignup = () => {
    navigate('/signup', { state: { initialRole: 'broker' } });
  };
  
  const navigateToRegister = () => {
    setActiveTab('register');
  };
  
  // Show loading while redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-dalali-600 mb-4">You are already a broker. Redirecting to broker portal...</div>
        <div className="animate-spin h-8 w-8 border-4 border-dalali-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar title="Become a Broker" showSearch={false} />
      
      <main className="px-4 pb-4">
        {!user && activeTab === 'info' && (
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
        
        {activeTab === 'login' && <LoginForm />}
        
        {activeTab === 'register' && !user && (
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <h2 className="text-lg font-semibold text-dalali-800 mb-3">Create an Account</h2>
            <p className="text-gray-600 text-sm mb-4">Register as a new broker</p>
            <Button 
              onClick={navigateToSignup} 
              className="w-full bg-dalali-600 hover:bg-dalali-700"
            >
              <User size={16} className="mr-2" />
              Sign Up as Broker
            </Button>
            <div className="mt-4 text-center">
              <button 
                onClick={() => setActiveTab('login')} 
                className="text-sm text-dalali-600 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        )}
        
        {isRegistering ? (
          <RegistrationForm onSubmit={handleSubmitRegistration} onBack={handleBack} />
        ) : (
          activeTab === 'info' && (
            <>
              <HeroSection onRegister={handleRegister} />
              
              <div className="mb-8">
                <Tabs defaultValue="new" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="new">New Broker</TabsTrigger>
                    <TabsTrigger value="existing">Existing Broker</TabsTrigger>
                  </TabsList>
                  <TabsContent value="new">
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                      <h3 className="font-medium text-dalali-800 mb-2">Register as a Broker</h3>
                      <p className="text-sm text-gray-600 mb-3">Join our network of professional brokers and start earning today</p>
                      <Button 
                        onClick={navigateToRegister}
                        className="w-full bg-dalali-600 hover:bg-dalali-700"
                      >
                        Get Started
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="existing">
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                      <h3 className="font-medium text-dalali-800 mb-2">Already a Broker?</h3>
                      <p className="text-sm text-gray-600 mb-3">Login to access your broker dashboard</p>
                      <Button 
                        onClick={navigateToLogin}
                        className="w-full bg-dalali-600 hover:bg-dalali-700"
                      >
                        Login
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
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
          )
        )}
      </main>
      
      {/* Role Change Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-dalali-600 h-5 w-5" />
              Switch to Broker Account
            </DialogTitle>
            <DialogDescription>
              You are about to upgrade your account from client to broker. 
              This will give you access to the broker dashboard and broker-specific features.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-start gap-3 mb-2 text-sm">
              <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">List Properties</p>
                <p className="text-gray-600">Add and manage property listings to be shown to clients</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-2 text-sm">
              <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Generate Marketing Materials</p>
                <p className="text-gray-600">Create social media ready content to promote your listings</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Receive Client Inquiries</p>
                <p className="text-gray-600">Get direct messages and manage client communications</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              className="bg-dalali-600 hover:bg-dalali-700" 
              onClick={handleConfirmRoleChange}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></span>
                  Processing...
                </>
              ) : (
                'Confirm & Continue'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomTabs />
    </div>
  );
};

export default BecomeBroker;
