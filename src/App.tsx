
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/hooks/useLanguage";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import FindBroker from "./pages/FindBroker";
import Requests from "./pages/Requests";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Check if the app was recently opened
  useEffect(() => {
    const lastOpened = localStorage.getItem('lastOpened');
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000; // 5 minutes in milliseconds
    
    // Skip splash if app was opened in the last 5 minutes
    if (lastOpened && parseInt(lastOpened) > fiveMinutesAgo) {
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
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            {showSplash ? (
              <SplashScreen onAnimationComplete={handleAnimationComplete} />
            ) : (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/find-broker" element={<FindBroker />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
