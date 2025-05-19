
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Phone, Facebook } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { googleLogin, facebookLogin } from '@/utils/socialAuth';

const loginFormSchema = z.object({
  identifier: z.string().min(1, { message: "Email or phone number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, clearError, socialLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      await login(values.identifier, values.password);
      
      toast({
        title: "Login successful",
        description: "Redirecting to broker dashboard...",
        duration: 3000,
      });
      
      setTimeout(() => {
        navigate('/broker-landing');
      }, 1000);
    } catch (err) {
      // Error is handled by the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    try {
      let userData;
      
      if (provider === 'google') {
        userData = await googleLogin();
      } else {
        userData = await facebookLogin();
      }
      
      await socialLogin(provider, userData);
      
      toast({
        title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Login`,
        description: "Login successful!",
        duration: 3000,
      });
      
      setTimeout(() => {
        navigate('/broker-landing');
      }, 1000);
    } catch (err) {
      toast({
        title: "Login Error",
        description: err instanceof Error ? err.message : "An error occurred during social login",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-dalali-800 mb-4">
        Login as Broker
      </h2>
      
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
      
      <div className="mb-4 flex">
        <button 
          type="button"
          className={`flex-1 py-2 text-center rounded-l-lg ${loginType === 'email' ? 'bg-dalali-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setLoginType('email')}
        >
          Email
        </button>
        <button 
          type="button"
          className={`flex-1 py-2 text-center rounded-r-lg ${loginType === 'phone' ? 'bg-dalali-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setLoginType('phone')}
        >
          Phone
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{loginType === 'email' ? 'Email' : 'Phone Number'}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      {loginType === 'email' ? <Mail size={18} /> : <Phone size={18} />}
                    </div>
                    <Input
                      placeholder={loginType === 'email' ? 'name@example.com' : '+1234567890'}
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit"
            className="w-full bg-dalali-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or continue with</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={socialLoading !== null}
        >
          {socialLoading === 'google' ? (
            <span className="animate-spin h-4 w-4 mr-2 border-2 border-gray-600 rounded-full border-t-transparent"></span>
          ) : (
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
          )}
          Google
        </button>
        
        <button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          className="w-full flex items-center justify-center py-2.5 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
          disabled={socialLoading !== null}
        >
          {socialLoading === 'facebook' ? (
            <span className="animate-spin h-4 w-4 mr-2 border-2 border-white rounded-full border-t-transparent"></span>
          ) : (
            <Facebook size={20} className="mr-2" />
          )}
          Facebook
        </button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Don't have an account? Register as a broker below.</p>
      </div>
    </div>
  );
};

export default LoginForm;
