
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bell, Users, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const { toast } = useToast();
  
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
      required: false, // Changed from true to false
      explanation: 'Notifications keep you informed about new messages from brokers, updates on property listings you\'re interested in, and occasional promotional offers that might interest you.'
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
  const [showPermissionDeniedAlert, setShowPermissionDeniedAlert] = useState(false);
  const [deniedPermission, setDeniedPermission] = useState<string>('');
  const [granted, setGranted] = useState<Record<string, boolean>>({
    location: false,
    notifications: false,
    contacts: false
  });
  
  // Check if permissions are already granted
  useEffect(() => {
    const checkExistingPermissions = async () => {
      // Check location permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            // Location permission already granted
            setGranted(prev => ({ ...prev, location: true }));
          },
          () => {
            // Location permission not granted yet
            console.log("Location permission not granted yet");
          },
          { timeout: 10000, enableHighAccuracy: true }
        );
      }
      
      // Check notification permission
      if ('Notification' in window) {
        const permission = Notification.permission;
        if (permission === 'granted') {
          setGranted(prev => ({ ...prev, notifications: true }));
        }
      }
      
      // For contacts, we just check localStorage since browser doesn't expose this directly
      const contactsPermission = localStorage.getItem('contactsPermission');
      if (contactsPermission === 'granted') {
        setGranted(prev => ({ ...prev, contacts: true }));
      }
    };
    
    checkExistingPermissions();
  }, []);
  
  const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your device doesn't support location services",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      return new Promise<boolean>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            toast({
              title: "Location access granted",
              description: "You've successfully granted location access"
            });
            resolve(true);
          },
          (error) => {
            console.error("Location permission denied", error);
            setDeniedPermission('location');
            setShowPermissionDeniedAlert(true);
            resolve(false);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    } catch (error) {
      console.error("Error requesting location", error);
      return false;
    }
  };
  
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Notification access granted",
          description: "You've successfully granted notification access"
        });
        return true;
      } else {
        setDeniedPermission('notifications');
        setShowPermissionDeniedAlert(true);
        return false;
      }
    } catch (error) {
      console.error("Error requesting notification permission", error);
      return false;
    }
  };
  
  const requestContactsPermission = async () => {
    // Since there's no direct browser API for contacts, we'll simulate it with localStorage
    try {
      // In a real app, this would use the Contacts Picker API or a native mobile API
      localStorage.setItem('contactsPermission', 'granted');
      toast({
        title: "Contacts access granted",
        description: "You've successfully granted contacts access"
      });
      return true;
    } catch (error) {
      console.error("Error simulating contacts permission", error);
      return false;
    }
  };
  
  const handlePermissionToggle = async (id: string) => {
    if (granted[id]) {
      // If already granted, we can only disable it in our app (can't revoke browser permissions)
      setGranted(prev => ({ ...prev, [id]: false }));
      if (id === 'contacts') {
        localStorage.removeItem('contactsPermission');
      }
      toast({
        title: `${id} access disabled`,
        description: `You've disabled ${id} access for this app`
      });
      return;
    }
    
    // Request the permission
    let success = false;
    
    switch (id) {
      case 'location':
        success = await requestLocationPermission();
        break;
      case 'notifications':
        success = await requestNotificationPermission();
        break;
      case 'contacts':
        success = await requestContactsPermission();
        break;
    }
    
    if (success) {
      setGranted(prev => ({ ...prev, [id]: true }));
    }
  };
  
  const showExplanation = (id: string) => {
    setOpenDialog(id);
  };
  
  const canProceed = () => {
    // Only location permission is required now
    return granted['location'];
  };
  
  const handleContinue = () => {
    localStorage.setItem('onboardingComplete', 'true');
    
    // Record which permissions were granted
    Object.entries(granted).forEach(([key, value]) => {
      localStorage.setItem(`permission_${key}`, value ? 'granted' : 'denied');
    });
    
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
            We need location permission to provide you with the best experience
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
                    <Switch
                      checked={granted[permission.id]}
                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                      className={`${granted[permission.id] ? 'bg-dalali-600' : 'bg-gray-300'}`}
                    />
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
            'Please enable location access to continue'
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
                  setOpenDialog(null);
                  handlePermissionToggle(permission.id);
                }}
                className="bg-dalali-600 hover:bg-dalali-700"
              >
                Enable
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
      
      {/* Permission denied alert */}
      <AlertDialog open={showPermissionDeniedAlert} onOpenChange={setShowPermissionDeniedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permission Required</AlertDialogTitle>
            <AlertDialogDescription>
              {deniedPermission === 'location' && (
                "Location access was denied. To use this feature, please enable location access in your browser settings."
              )}
              {deniedPermission === 'notifications' && (
                "Notification access was denied. To receive updates, please enable notifications in your browser settings."
              )}
              {deniedPermission === 'contacts' && (
                "Contacts access was denied. To use the referral feature, please try again or check your privacy settings."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowPermissionDeniedAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowPermissionDeniedAlert(false);
                // Redirect to browser settings (this varies by browser and might not work in all browsers)
                if (deniedPermission === 'location') {
                  if (navigator.userAgent.includes('Chrome')) {
                    window.open('chrome://settings/content/location', '_blank');
                  } else if (navigator.userAgent.includes('Firefox')) {
                    window.open('about:preferences#privacy', '_blank');
                  }
                  // Safari and other browsers don't have direct links to settings
                }
              }}
            >
              Open Settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PermissionsRequest;
