// src/context/AuthContext.tsx
import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';
import { authService } from '../services/auth';
import { logger } from '../utils/logger';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

type AuthAction = 
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Initialize auth state on app load
   */
  useEffect(() => {
    const initializeAuth = async () => {
      if (!authService.isAuthenticated()) {
        dispatch({ type: 'AUTH_LOGOUT' });
        return;
      }

      try {
        dispatch({ type: 'AUTH_START' });
        const user = await authService.getCurrentUser();
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
        logger.info('User authenticated on app load', { userId: user.id });
      } catch (error) {
        logger.error('Failed to authenticate user on app load', error);
        dispatch({ type: 'AUTH_ERROR', payload: 'Session expired. Please login again.' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { user } = await authService.login(credentials);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error: any) {
      const message = error.message || 'Login failed';
      logger.error('Login failed', error);
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { user } = await authService.register(data);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error: any) {
      const message = error.message || 'Registration failed';
      logger.error('Registration failed', error);
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      dispatch({ type: 'AUTH_LOGOUT' });
      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Logout failed', error);
      // Still dispatch logout to clear local state
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      logger.info('User profile updated', { userId: updatedUser.id });
    } catch (error: any) {
      const message = error.message || 'Failed to update profile';
      logger.error('Profile update failed', error);
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const user = await authService.getCurrentUser();
      dispatch({ type: 'UPDATE_USER', payload: user });
    } catch (error) {
      logger.error('Failed to refresh user', error);
      // Don't throw here as it's a background refresh
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
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