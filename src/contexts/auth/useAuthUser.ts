
import { useState, useEffect } from 'react';
import { AuthUser } from './types';

export const useAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  
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
  }, []);

  const updateUser = (userData: AuthUser | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  return { user, updateUser };
};
