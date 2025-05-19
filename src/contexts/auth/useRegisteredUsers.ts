
import { useState, useEffect } from 'react';
import { SignupData } from './types';

export const useRegisteredUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, SignupData>>({});
  
  useEffect(() => {
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
  }, []);

  const updateRegisteredUsers = (newRegisteredUsers: Record<string, SignupData>) => {
    setRegisteredUsers(newRegisteredUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(newRegisteredUsers));
  };

  const checkUserExists = (identifier: string): boolean => {
    return Boolean(
      Object.values(registeredUsers).find(
        (u) => u.email === identifier || u.phone === identifier
      )
    );
  };

  const findUserByCredentials = (identifier: string, password: string): SignupData | undefined => {
    return Object.values(registeredUsers).find(
      (u) => (u.email === identifier || u.phone === identifier) && u.password === password
    );
  };

  return {
    registeredUsers,
    updateRegisteredUsers,
    checkUserExists,
    findUserByCredentials
  };
};
