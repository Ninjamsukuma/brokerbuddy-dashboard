import React, { createContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AuthContextType, SignupData, UserRole, AuthUser } from './types';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from our profiles table
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
              
              if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                return;
              }
              
              const authUser: AuthUser = {
                id: session.user.id,
                name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
                email: profile?.email || session.user.email,
                phone: profile?.phone,
                role: (profile?.role as UserRole) || 'client',
                token: session.access_token,
                avatar: profile?.avatar_url,
              };
              
              setUser(authUser);
            } catch (err) {
              console.error('Error setting up user:', err);
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // The onAuthStateChange will handle setting the user
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (identifier: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password: password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        duration: 2000,
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'facebook', userData: { name: string, email: string, id: string }): Promise<void> => {
    setError("Social login is not implemented yet");
    throw new Error("Social login is not implemented yet");
  };

  const signup = async (userData: SignupData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const email = userData.email;
      if (!email) {
        throw new Error("Email is required for signup");
      }
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.name,
            role: userData.role,
            phone: userData.phone,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: `Welcome to Dalali, ${userData.name}! Please check your email to verify your account.`,
        duration: 5000,
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (role: UserRole): Promise<void> => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('user_id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local user state
      setUser({ ...user, role });
      
      toast({
        title: "Role updated",
        description: `Your role has been updated to ${role}`,
        duration: 2000,
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update role';
      setError(errorMessage);
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        duration: 2000,
      });
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const getRedirectPath = (): string => {
    if (!user) return '/';
    
    // Redirect based on user role
    switch (user.role) {
      case 'broker':
        return '/broker-dashboard';
      case 'client':
      default:
        return '/';
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const checkUserExists = async (identifier: string): Promise<boolean> => {
    try {
      // Use maybeSingle to avoid 406 when no rows; note RLS blocks viewing other users when unauthenticated
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', identifier)
        .maybeSingle();
      
      if (error) {
        console.warn('checkUserExists error (ignored):', error);
      }
      return !!data;
    } catch (e) {
      console.warn('checkUserExists exception (ignored):', e);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    socialLogin,
    logout,
    clearError,
    updateUserRole,
    getRedirectPath,
    checkUserExists,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};