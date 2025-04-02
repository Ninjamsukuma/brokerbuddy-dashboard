
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login } = useAuth();
  
  const [otp, setOtp] = useState<string>('');
  const [isResendActive, setIsResendActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  
  // Get phone from state or use a placeholder
  const phoneNumber = location.state?.phoneNumber || '+25571234567';
  
  // Handle countdown for resend button
  useEffect(() => {
    if (countdown > 0 && !isResendActive) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isResendActive) {
      setIsResendActive(true);
    }
  }, [countdown, isResendActive]);
  
  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Mock verification for now - would use Firebase in a real app
      if (otp === '1234') {
        // Mock login for demo purposes
        await login(phoneNumber, 'demopassword');
        
        toast({
          title: "Verification Successful",
          description: "Your phone number has been verified",
          duration: 3000,
        });
        
        // Navigate to permissions request screen
        navigate('/permissions');
      } else {
        toast({
          title: "Invalid Code",
          description: "The code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleResendOTP = () => {
    if (!isResendActive) return;
    
    // Mock resend OTP - would use Firebase in a real app
    toast({
      title: "OTP Resent",
      description: `A new verification code has been sent to ${phoneNumber}`,
      duration: 3000,
    });
    
    setIsResendActive(false);
    setCountdown(30);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-dalali-600"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <motion.div 
        className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-dalali-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-dalali-600" />
          </div>
          <h1 className="text-2xl font-bold text-dalali-800">Verification Code</h1>
          <p className="text-gray-500 mt-2">
            We've sent a 4-digit code to <br />
            <span className="font-medium text-dalali-800">{phoneNumber}</span>
          </p>
        </div>
        
        <div className="w-full mb-8">
          <InputOTP 
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)}
            render={({ slots }) => (
              <InputOTPGroup className="gap-3 justify-center">
                {slots.map((slot, index) => (
                  <InputOTPSlot 
                    key={index} 
                    {...slot}
                    index={index}
                    className="h-14 w-14 text-2xl border-2 border-gray-300 focus:border-dalali-600"
                  />
                ))}
              </InputOTPGroup>
            )}
          />
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Didn't receive the code?{" "}
            <button
              onClick={handleResendOTP}
              disabled={!isResendActive}
              className={`font-medium ${isResendActive ? 'text-dalali-600 hover:underline' : 'text-gray-400'}`}
            >
              {isResendActive ? 'Resend Code' : `Resend in ${countdown}s`}
            </button>
          </p>
        </div>
        
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 4 || isVerifying}
          className="w-full bg-dalali-600 hover:bg-dalali-700 py-6 text-base"
        >
          {isVerifying ? (
            <div className="flex items-center">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            'Verify'
          )}
        </Button>
        
        <p className="text-center text-xs text-gray-500 mt-6">
          For testing purposes, use the code: 1234
        </p>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
