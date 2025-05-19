
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Phone, Lock, Fingerprint, Facebook, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/components/ui/use-toast';

type LoginFormData = {
  identifier: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError, user, getRedirectPath, checkUserExists } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm<LoginFormData>();
  
  const returnUrl = location.state?.returnUrl || getRedirectPath();
  
  useEffect(() => {
    // Check if user has logged in before - simulate biometric availability
    const previousLogin = localStorage.getItem('previousLogin');
    if (previousLogin) {
      setIsBiometricAvailable(true);
    }
    
    if (user) {
      // Use the helper function to determine where to redirect based on role
      navigate(returnUrl);
    }
  }, [user, navigate, returnUrl]);
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Check if user exists first
      const userExists = await checkUserExists(data.identifier);
      
      if (!userExists) {
        toast({
          title: "Account Not Found",
          description: "No account found with these credentials. Please sign up first.",
          variant: "destructive",
          duration: 3000,
        });
        setIsLoading(false);
        navigate('/register', { state: { prefilledEmail: isEmail ? data.identifier : undefined } });
        return;
      }
      
      await login(data.identifier, data.password);
      
      localStorage.setItem('previousLogin', 'true');
      toast({
        title: "Login successful",
        description: "Welcome back!",
        duration: 3000,
      });
    } catch (err) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePhoneLogin = () => {
    navigate('/otp-verification', { state: { phoneNumber: '+255712345678' } });
  };
  
  const handleBiometricLogin = () => {
    // In a real app, this would use the device's biometric authentication
    // For demo purposes, we'll just simulate a successful authentication
    toast({
      title: "Biometric Authentication",
      description: "Authentication successful! Welcome back.",
      duration: 3000,
    });
    
    // Use a mock login for demo
    login("user@example.com", "password123");
  };
  
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // In a real app, this would use Firebase Authentication
    // For demo purposes, we'll just simulate a successful authentication
    toast({
      title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Login`,
      description: "Social login successful!",
      duration: 3000,
    });
    
    // Use a mock login for demo
    login("social@example.com", "password123");
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 text-dalali-600">
            <p>You are already logged in.</p>
            <p>Redirecting to {user.role === 'broker' ? 'broker dashboard' : 'home page'}...</p>
          </div>
          <div className="animate-spin h-8 w-8 border-4 border-dalali-600 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-4">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-dalali-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to access your account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
            <button 
              onClick={clearError}
              className="ml-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-xl p-6 mb-4">
          <div className="mb-6 flex">
            <button 
              type="button"
              className={`flex-1 py-2 text-center rounded-l-lg ${isEmail ? 'bg-dalali-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setIsEmail(true)}
            >
              Email
            </button>
            <button 
              type="button"
              className={`flex-1 py-2 text-center rounded-r-lg ${!isEmail ? 'bg-dalali-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setIsEmail(false)}
            >
              Phone
            </button>
          </div>
          
          {isEmail ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.identifier ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("identifier", { 
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                    })}
                  />
                </div>
                {errors.identifier && (
                  <p className="mt-1 text-red-600 text-sm">{errors.identifier.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your password"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-red-600 text-sm">{errors.password.message}</p>
                )}
              </div>
              
              <div className="mb-6 text-right">
                <a 
                  href="#" 
                  className="text-dalali-600 text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin h-5 w-5 mr-3 border-2 border-white rounded-full border-t-transparent"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>
          ) : (
            <div className="py-2">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    placeholder="+255712345678"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none border-gray-300"
                    defaultValue="+255712345678"
                  />
                </div>
              </div>
              
              <motion.button
                type="button"
                onClick={handlePhoneLogin}
                className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue with Phone <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </div>
          )}

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with</span>
            </div>
          </div>
        
          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </motion.button>
            
            <motion.button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex items-center justify-center py-2.5 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Facebook size={20} className="mr-2" />
              Facebook
            </motion.button>
          </div>
          
          {isBiometricAvailable && (
            <motion.button
              type="button"
              onClick={handleBiometricLogin}
              className="w-full mt-3 flex items-center justify-center py-2.5 border border-dalali-500 text-dalali-600 rounded-lg hover:bg-dalali-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Fingerprint size={20} className="mr-2" />
              Use Biometrics
            </motion.button>
          )}
        </div>
        
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-dalali-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
