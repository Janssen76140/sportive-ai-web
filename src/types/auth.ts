// Authentication Types for SportiveAI

export type UserType = 'parent' | 'academy' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin: string;
  avatar?: string;
  
  // Parent-specific data
  children?: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    primarySport: string;
  }[];
  
  // Academy-specific data
  academyName?: string;
  academyLocation?: string;
  totalAthletes?: number;
  subscription?: {
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    nextBilling: string;
    amount: number;
  };
  
  // Admin-specific data
  permissions?: string[];
  role?: 'super_admin' | 'admin' | 'moderator';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType?: UserType;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  
  // Academy-specific registration
  academyName?: string;
  academyLocation?: string;
  estimatedAthletes?: number;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  switchUserType: (userType: UserType) => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface SessionData {
  token: string;
  user: User;
  expiresAt: number;
  refreshToken: string;
}