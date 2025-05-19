
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const loginFormSchema = z.object({
  identifier: z.string().min(1, { message: "Email or phone number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

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
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Don't have an account? Register as a broker below.</p>
      </div>
    </div>
  );
};

export default LoginForm;
