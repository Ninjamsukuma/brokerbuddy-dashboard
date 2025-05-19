
import { UserRole, AuthUser } from './types';

export const getRedirectPath = (user: AuthUser | null): string => {
  if (!user) return '/login';
  return user.role === 'broker' ? '/broker-landing' : '/';
};

export const createSocialAuthUser = (
  provider: 'google' | 'facebook', 
  userData: { name: string, email: string, id: string },
  role: UserRole
): AuthUser => {
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: role,
    token: `${provider}-mock-jwt-token`,
    avatar: provider === 'google' 
      ? `https://lh3.googleusercontent.com/a/${userData.id}` 
      : `https://graph.facebook.com/${userData.id}/picture?type=large`
  };
};
