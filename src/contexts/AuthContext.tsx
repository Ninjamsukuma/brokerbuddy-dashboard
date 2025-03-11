
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

type UserRole = 'client' | 'broker';

interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface SignupData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // This would be a real API call in production
      // const response = await axios.post('/api/auth/login', { identifier, password });
      
      // Mock login for development
      // In production, this would be replaced with an actual API call
      const mockResponse = {
        data: {
          user: {
            id: '123',
            name: 'John Doe',
            email: identifier.includes('@') ? identifier : undefined,
            phone: !identifier.includes('@') ? identifier : undefined,
            role: 'client' as UserRole,
          },
          token: 'mock-jwt-token'
        }
      };
      
      const userData: AuthUser = {
        ...mockResponse.data.user,
        token: mockResponse.data.token
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred during login';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      // This would be a real API call in production
      // const response = await axios.post('/api/auth/signup', userData);
      
      // Mock signup for development
      // In production, this would be replaced with an actual API call
      const mockResponse = {
        data: {
          user: {
            id: '123',
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
          },
          token: 'mock-jwt-token'
        }
      };
      
      const newUser: AuthUser = {
        ...mockResponse.data.user,
        token: mockResponse.data.token
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred during signup';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
