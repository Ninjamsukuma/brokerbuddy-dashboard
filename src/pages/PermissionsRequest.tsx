import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bell, Users, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Permission = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  explanation: string;
};

const PermissionsRequest = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'location',
      name: 'Location Access',
      description: 'Required to find nearby brokers',
      icon: <MapPin className="h-6 w-6 text-dalali-600" />,
      required: true,
      explanation: 'We use your location to show you brokers nearby and provide accurate property listings in your area. This helps you find the most relevant options without having to manually search.'
    },
    {
      id: 'notifications',
      name: 'Notification Access',
      description: 'Used for updates and promotional offers',
      icon: <Bell className="h-6 w-6 text-dalali-600" />,
      required: true,
      explanation: 'Notifications keep you informed about new messages from brokers, updates on property listings you're interested in, and occasional promotional offers that might interest you.'
    },
    {
      id: 'contacts',
      name: 'Contacts Access',
      description: 'Used for referral programs (optional)',
      icon: <Users className="h-6 w-6 text-dalali-600" />,
      required: false,
      explanation: 'Contact access allows you to easily refer friends and family to our service. You can earn rewards through our referral program when your contacts join and use our platform.'
    },
  ]);
  
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [granted, setGranted] = useState<Record<string, boolean>>({
    location: false,
    notifications: false,
    contacts: false
  });
  
  const handlePermissionToggle = (id: string) => {
    setGranted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const showExplanation = (id: string) => {
    setOpenDialog(id);
  };
  
  const canProceed = () => {
    return permissions
      .filter(p => p.required)
      .every(p => granted[p.id]);
  };
  
  const handleContinue = () => {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <motion.div 
        className="flex-1 flex flex-col max-w-md mx-auto w-full py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-dalali-800">App Permissions</h1>
          <p className="text-gray-500 mt-2">
            We need a few permissions to provide you with the best experience
          </p>
        </div>
        
        <div className="flex-1 space-y-4 mb-8">
          {permissions.map((permission) => (
            <div 
              key={permission.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {permission.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {permission.name}
                        {permission.required && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                    <button
                      onClick={() => showExplanation(permission.id)}
                      className="text-dalali-600 hover:text-dalali-700"
                    >
                      <Info size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <button
                      onClick={() => handlePermissionToggle(permission.id)}
                      className="text-sm font-medium text-dalali-600 hover:underline"
                    >
                      {granted[permission.id] ? 'Disable' : 'Enable'}
                    </button>
                    <div className={`h-6 w-10 rounded-full transition-colors ${granted[permission.id] ? 'bg-dalali-600' : 'bg-gray-300'}`}>
                      <motion.div
                        className="h-6 w-6 bg-white rounded-full shadow-md"
                        animate={{ x: granted[permission.id] ? 16 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <p className="text-xs text-gray-500 mt-2 italic">
            * Required permissions
          </p>
        </div>
        
        <Button
          onClick={handleContinue}
          disabled={!canProceed()}
          className="w-full bg-dalali-600 hover:bg-dalali-700 py-6 text-base flex items-center justify-center"
        >
          {canProceed() ? (
            <>
              Continue <ArrowRight size={18} className="ml-2" />
            </>
          ) : (
            'Please enable required permissions'
          )}
        </Button>
      </motion.div>
      
      {/* Permission explanation dialogs */}
      {permissions.map((permission) => (
        <Dialog 
          key={permission.id}
          open={openDialog === permission.id} 
          onOpenChange={() => setOpenDialog(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {permission.icon}
                <span className="ml-2">{permission.name}</span>
              </DialogTitle>
              <DialogDescription>
                {permission.explanation}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setOpenDialog(null)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setGranted(prev => ({ ...prev, [permission.id]: true }));
                  setOpenDialog(null);
                }}
                className="bg-dalali-600 hover:bg-dalali-700"
              >
                Enable
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default PermissionsRequest;
