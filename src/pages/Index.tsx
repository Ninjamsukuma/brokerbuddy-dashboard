
import React from 'react';
import NavigationBar from '../components/ui/NavigationBar';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickActions from '../components/dashboard/QuickActions';
import MapView from '../components/dashboard/MapView';
import FeaturedBrokers from '../components/dashboard/FeaturedBrokers';
import RecentActivity from '../components/dashboard/RecentActivity';
import BottomTabs from '../components/ui/BottomTabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavigationBar />
      
      <main className="px-4 pb-4">
        <WelcomeBanner name="Samwel" />
        
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
