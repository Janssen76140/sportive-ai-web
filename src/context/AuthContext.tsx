import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials, RegisterData, User, SessionData } from '../types/auth.ts';
import { mockUsers, mockPasswords } from '../data/mockAuthData.ts';

// Initial Auth State
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

// Auth Actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session Storage Keys
const SESSION_KEY = 'sportiveai_session';
const DEMO_MODE_KEY = 'sportiveai_demo_mode';

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load session on mount
  useEffect(() => {
    loadSession();
  }, []);

  // Session Management
  const saveSession = (user: User) => {
    const sessionData: SessionData = {
      token: `mock_token_${user.id}_${Date.now()}`,
      user,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      refreshToken: `refresh_${user.id}_${Date.now()}`
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    localStorage.setItem(DEMO_MODE_KEY, 'true');
  };

  const loadSession = async () => {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (sessionData) {
        const session: SessionData = JSON.parse(sessionData);
        
        // Check if session is still valid
        if (session.expiresAt > Date.now()) {
          // Update last login
          const updatedUser = {
            ...session.user,
            lastLogin: new Date().toISOString()
          };
          
          dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
          saveSession(updatedUser); // Update session with new last login
        } else {
          // Session expired
          clearSession();
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading session:', error);
      clearSession();
    }
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(DEMO_MODE_KEY);
    dispatch({ type: 'LOGOUT' });
  };

  // Authentication Methods
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Find user by email
      const user = mockUsers.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
      
      if (!user) {
        throw new Error('User not found');
      }

      // Check password
      const expectedPassword = mockPasswords[user.email];
      if (credentials.password !== expectedPassword) {
        throw new Error('Invalid password');
      }

      // Check user type if specified
      if (credentials.userType && user.userType !== credentials.userType) {
        throw new Error(`Invalid user type. Expected ${credentials.userType}, got ${user.userType}`);
      }

      // Check user status
      if (user.status === 'suspended') {
        throw new Error('Account suspended. Please contact support.');
      }

      if (user.status === 'inactive') {
        throw new Error('Account inactive. Please contact support to reactivate.');
      }

      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      };

      // Save session and dispatch success
      console.log('Login successful, saving session for user:', updatedUser);
      saveSession(updatedUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      clearSession();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local session
      clearSession();
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Validate password confirmation
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create new user
      const newUser: User = {
        id: `${data.userType}-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        status: 'pending', // New accounts start as pending
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        
        // Academy-specific data
        ...(data.userType === 'academy' && {
          academyName: data.academyName,
          academyLocation: data.academyLocation,
          totalAthletes: data.estimatedAthletes || 0,
          subscription: {
            plan: 'Trial',
            status: 'active',
            nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
            amount: 0
          }
        }),

        // Parent starts with no children
        ...(data.userType === 'parent' && {
          children: []
        }),

        // Admin gets basic permissions
        ...(data.userType === 'admin' && {
          role: 'moderator' as const,
          permissions: ['basic_analytics', 'support_access']
        })
      };

      // Add to mock users (in real app, this would be API call)
      mockUsers.push(newUser);
      mockPasswords[newUser.email] = data.password;

      // Auto-login after registration
      saveSession(newUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Demo helper for switching between user types
  const switchUserType = (userType: 'parent' | 'academy' | 'admin') => {
    const demoUser = mockUsers.find(u => u.userType === userType);
    if (demoUser) {
      const updatedUser = {
        ...demoUser,
        lastLogin: new Date().toISOString()
      };
      saveSession(updatedUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...updates };
      saveSession(updatedUser);
      dispatch({ type: 'UPDATE_USER', payload: updates });
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    switchUserType,
    updateUser
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};