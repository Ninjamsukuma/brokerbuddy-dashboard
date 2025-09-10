
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/ui/NavigationBar';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickActions from '../components/dashboard/QuickActions';
import MapView from '../components/dashboard/MapView';
import FeaturedBrokers from '../components/dashboard/FeaturedBrokers';
import RecentActivity from '../components/dashboard/RecentActivity';
import BottomTabs from '../components/ui/BottomTabs';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile } = useSupabaseAuth();
  
  useEffect(() => {
    // Check if user has completed onboarding
    const hasSelectedLanguage = localStorage.getItem('hasSelectedLanguage');
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    const locationPermission = localStorage.getItem('permission_location');
    
    if (!hasSelectedLanguage) {
      // User hasn't selected a language yet, redirect to language selection
      navigate('/language-selection');
    } else if (!onboardingComplete || locationPermission !== 'granted') {
      // User hasn't completed permissions yet or location permission is not granted
      navigate('/permissions');
    } else if (!user) {
      // User hasn't logged in yet
      navigate('/auth');
    }
  }, [navigate, user]);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar />
      
      <main className="px-4 pb-4">
        <WelcomeBanner name={profile?.full_name || user?.email || "Guest"} />
        
        <QuickActions />
        
        <MapView />
        
        <FeaturedBrokers />
        
        <RecentActivity />
      </main>
      
      <BottomTabs />
    </div>
  );
};

export default Index;
