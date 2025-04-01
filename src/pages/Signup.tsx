import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Mail, Phone, Lock, Briefcase, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

type SignupFormData = {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: 'client' | 'broker';
};

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, error, clearError, user, getRedirectPath } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  
  const initialRole = location.state?.initialRole || 'client';
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignupFormData>({
    defaultValues: {
      role: initialRole
    }
  });
  
  const password = watch('password', '');
  
  useEffect(() => {
    if (location.state?.initialRole) {
      setValue('role', location.state.initialRole);
    }
  }, [location.state, setValue]);
  
  useEffect(() => {
    if (user) {
      navigate(getRedirectPath());
    }
  }, [user, navigate, getRedirectPath]);
  
  const onSubmit = async (data: SignupFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      
      await signup({
        name: data.name,
        email: isEmail ? data.email : undefined,
        phone: !isEmail ? data.phone : undefined,
        password: data.password,
        role: data.role,
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
        duration: 3000,
      });
      
      navigate(data.role === 'broker' ? '/broker-dashboard' : '/');
    } catch (err) {
      // Error is handled by the auth context
    }
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-background py-12 px-4">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-dalali-800">Create an Account</h1>
          <p className="text-gray-500 mt-2">Join our community today</p>
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
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("name", { 
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name is too short" }
                  })}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isEmail ? 'Email' : 'Phone Number'}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  {isEmail ? <Mail size={18} /> : <Phone size={18} />}
                </div>
                {isEmail ? (
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("email", { 
                      required: isEmail ? "Email is required" : false,
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                    })}
                  />
                ) : (
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("phone", { 
                      required: !isEmail ? "Phone number is required" : false,
                      pattern: { value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, message: 'Invalid phone number format' }
                    })}
                  />
                )}
              </div>
              {(errors.email || errors.phone) && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.email?.message || errors.phone?.message}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Create a password"
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
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-red-600 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">I am registering as a</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${watch('role') === 'client' ? 'border-dalali-500 bg-dalali-50' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    value="client"
                    className="hidden"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <UserCheck size={20} className={`mr-2 ${watch('role') === 'client' ? 'text-dalali-600' : 'text-gray-400'}`} />
                  <span className={`${watch('role') === 'client' ? 'text-dalali-700 font-medium' : 'text-gray-600'}`}>Client</span>
                </label>
                
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${watch('role') === 'broker' ? 'border-dalali-500 bg-dalali-50' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    value="broker"
                    className="hidden"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <Briefcase size={20} className={`mr-2 ${watch('role') === 'broker' ? 'text-dalali-600' : 'text-gray-400'}`} />
                  <span className={`${watch('role') === 'broker' ? 'text-dalali-700 font-medium' : 'text-gray-600'}`}>Broker</span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-red-600 text-sm">{errors.role.message}</p>
              )}
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </form>
        </div>
        
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-dalali-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
