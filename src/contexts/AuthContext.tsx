
import React, { createContext, useContext, useState, useEffect } from 'react';
import { register, login as apiLogin } from '@/api/authApi'; 

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
  checkUserExists: (identifier: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fixed functional component declaration to properly use React hooks
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, SignupData>>({});

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('user');
      }
    }
    
    // Load registered users from localStorage
    const storedRegisteredUsers = localStorage.getItem('registeredUsers');
    if (storedRegisteredUsers) {
      try {
        setRegisteredUsers(JSON.parse(storedRegisteredUsers));
      } catch (e) {
        console.error('Error parsing stored registered users', e);
        localStorage.removeItem('registeredUsers');
      }
    }
    
    setLoading(false);
  }, []);

  const checkUserExists = async (identifier: string): Promise<boolean> => {
    // In a real app, this would be an API call to check if the user exists
    // For our demo, check local storage
    return Boolean(
      Object.values(registeredUsers).find(
        (u) => u.email === identifier || u.phone === identifier
      )
    );
  };

  const login = async (identifier: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Check if user exists in our registered users
      const userExists = await checkUserExists(identifier);
      
      if (!userExists) {
        throw new Error('No account found with these credentials. Please sign up first.');
      }
      
      // In a real app, this would be an API call that verifies credentials
      const registeredUser = Object.values(registeredUsers).find(
        (u) => (u.email === identifier || u.phone === identifier) && u.password === password
      );
      
      if (!registeredUser) {
        throw new Error('Invalid credentials. Please try again.');
      }
      
      // Simulate an API response with the user data
      const userData: AuthUser = {
        id: '123',
        name: registeredUser.name,
        email: registeredUser.email,
        phone: registeredUser.phone,
        role: registeredUser.role,
        token: 'mock-jwt-token',
        avatar: undefined
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred during login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      // Check if email or phone already exists
      if (userData.email && 
          Object.values(registeredUsers).some((u) => u.email === userData.email)) {
        throw new Error('Email is already registered.');
      }
      
      if (userData.phone && 
          Object.values(registeredUsers).some((u) => u.phone === userData.phone)) {
        throw new Error('Phone number is already registered.');
      }
      
      // In a real app, this would be an API call to register the user
      const mockResponse = {
        data: {
          user: {
            id: Date.now().toString(),
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
      
      // Save to registered users
      const identifier = userData.email || userData.phone || '';
      const updatedRegisteredUsers = {
        ...registeredUsers,
        [identifier]: userData
      };
      setRegisteredUsers(updatedRegisteredUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedRegisteredUsers));
      
      // Log the user in
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred during signup';
      setError(errorMessage);
      throw err;
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
    return user.role === 'broker' ? '/broker-landing' : '/';
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
      getRedirectPath,
      checkUserExists
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
