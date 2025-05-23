
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/hooks/useLanguage";
import { AuthProvider } from "@/contexts/AuthContext";
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./pages/LanguageSelection";
import OTPVerification from "./pages/OTPVerification";
import Index from "./pages/Index";
import FindBroker from "./pages/FindBroker";
import Requests from "./pages/Requests";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrokerDashboard from "./pages/BrokerDashboard";
import BecomeBroker from "./pages/BecomeBroker";
import BrokerLanding from "./pages/BrokerLanding";
import MarketingMaterials from "./pages/MarketingMaterials";
import NotFound from "./pages/NotFound";
import PermissionsRequest from "./pages/PermissionsRequest";
import NearbyBrokers from "./pages/NearbyBrokers";
import BookBroker from "./pages/BookBroker";
import BrokerProfile from "./pages/BrokerProfile";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Check if the app was recently opened - shortened to 3 minutes for better UX
  useEffect(() => {
    const lastOpened = localStorage.getItem('lastOpened');
    const now = Date.now();
    const threeMinutesAgo = now - 3 * 60 * 1000; // 3 minutes in milliseconds
    
    // Skip splash if app was opened in the last 3 minutes
    if (lastOpened && parseInt(lastOpened) > threeMinutesAgo) {
      setShowSplash(false);
    } else {
      localStorage.setItem('lastOpened', now.toString());
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AnimatePresence mode="wait">
              {showSplash ? (
                <SplashScreen onAnimationComplete={handleAnimationComplete} />
              ) : (
                <BrowserRouter>
                  <Routes>
                    {/* Core Pages */}
                    <Route path="/language-selection" element={<LanguageSelection />} />
                    <Route path="/otp-verification" element={<OTPVerification />} />
                    <Route path="/permissions" element={<PermissionsRequest />} />
                    <Route path="/" element={<Index />} />
                    
                    {/* Broker Discovery & Booking */}
                    <Route path="/find-broker" element={<FindBroker />} />
                    <Route path="/nearby-brokers" element={<NearbyBrokers />} />
                    <Route path="/broker/:id" element={<BrokerProfile />} />
                    <Route path="/book" element={<BookBroker />} />
                    
                    {/* User Pages */}
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                    
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/signup" element={<Signup />} /> {/* Alias for /register */}
                    <Route path="/dashboard" element={<BrokerDashboard />} />
                    <Route path="/become-broker" element={<BecomeBroker />} />
                    <Route path="/broker-landing" element={<BrokerLanding />} />
                    <Route path="/marketing-materials" element={<MarketingMaterials />} />
                    
                    {/* Redirect to language selection by default */}
                    <Route path="" element={<Navigate to="/language-selection" replace />} />
                    
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              )}
            </AnimatePresence>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
