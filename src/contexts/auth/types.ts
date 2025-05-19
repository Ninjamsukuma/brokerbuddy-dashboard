
export type UserRole = 'client' | 'broker';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  token: string;
  avatar?: string;
}

export interface SignupData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  socialLogin: (provider: 'google' | 'facebook', userData: { name: string, email: string, id: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserRole: (role: UserRole) => Promise<void>;
  getRedirectPath: () => string;
  checkUserExists: (identifier: string) => Promise<boolean>;
}
