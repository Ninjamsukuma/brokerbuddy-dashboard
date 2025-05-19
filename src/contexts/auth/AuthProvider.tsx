
import React, { createContext, useState, useContext } from 'react';
import { register, login as apiLogin } from '@/api/authApi'; 
import { AuthContextType, SignupData, UserRole, AuthUser } from './types';
import { useRegisteredUsers } from './useRegisteredUsers';
import { useAuthUser } from './useAuthUser';
import { getRedirectPath, createSocialAuthUser } from './authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUser } = useAuthUser();
  const { registeredUsers, updateRegisteredUsers, checkUserExists, findUserByCredentials } = useRegisteredUsers();

  const checkUserExistsAsync = async (identifier: string): Promise<boolean> => {
    // In a real app, this would be an API call to check if the user exists
    // For our demo, check local storage
    return Promise.resolve(checkUserExists(identifier));
  };

  const login = async (identifier: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Check if user exists in our registered users
      const userExists = await checkUserExistsAsync(identifier);
      
      if (!userExists) {
        throw new Error('No account found with these credentials. Please sign up first.');
      }
      
      // In a real app, this would be an API call that verifies credentials
      const registeredUser = findUserByCredentials(identifier, password);
      
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
      
      updateUser(userData);
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

  const socialLogin = async (provider: 'google' | 'facebook', userData: { name: string, email: string, id: string }) => {
    setLoading(true);
    setError(null);
    try {
      // Check if user exists by email
      const existingUser = Object.values(registeredUsers).find(
        (u) => u.email === userData.email
      );
      
      // If user exists, just log them in
      // If not, create a new account
      if (!existingUser) {
        // Create a random password for social login users
        const randomPassword = Math.random().toString(36).slice(-8);
        
        // Register the new user
        const newUserData: SignupData = {
          name: userData.name,
          email: userData.email,
          role: 'client', // Default role for social login
          password: randomPassword
        };
        
        // Save to registered users
        const updatedRegisteredUsers = {
          ...registeredUsers,
          [userData.email]: newUserData
        };
        updateRegisteredUsers(updatedRegisteredUsers);
      }
      
      // Create the user object
      const authUser = createSocialAuthUser(
        provider, 
        userData, 
        existingUser ? existingUser.role : 'client'
      );
      
      updateUser(authUser);
      return Promise.resolve();
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : `An error occurred during ${provider} login`;
      setError(errorMessage);
      return Promise.reject(errorMessage);
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
      updateRegisteredUsers(updatedRegisteredUsers);
      
      // Log the user in
      updateUser(newUser);
      
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
      
      updateUser(updatedUser);
      
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
    updateUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      signup, 
      socialLogin,
      logout, 
      clearError,
      updateUserRole,
      getRedirectPath: () => getRedirectPath(user),
      checkUserExists: checkUserExistsAsync
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
