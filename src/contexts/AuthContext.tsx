
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'client' | 'broker';

interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  token: string;
  avatar?: string;
}

interface SignupData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserRole: (role: UserRole) => Promise<void>;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fixed functional component declaration to properly use React hooks
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      const mockResponse = {
        data: {
          user: {
            id: '123',
            name: 'John Doe',
            email: identifier.includes('@') ? identifier : undefined,
            phone: !identifier.includes('@') ? identifier : undefined,
            role: 'client' as UserRole,
            avatar: undefined,
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
      const mockResponse = {
        data: {
          user: {
            id: '123',
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
            avatar: undefined,
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

  const updateUserRole = async (role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      
      const updatedUser: AuthUser = {
        ...user,
        role: role
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return Promise.resolve();
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred updating user role';
      setError(errorMessage);
      
      return Promise.reject(errorMessage);
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

  const getRedirectPath = () => {
    if (!user) return '/login';
    return user.role === 'broker' ? '/broker-dashboard' : '/';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      signup, 
      logout, 
      clearError,
      updateUserRole,
      getRedirectPath
    }}>
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
