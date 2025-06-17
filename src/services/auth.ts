// src/services/auth.ts
import type { User, LoginCredentials, RegisterData } from '../types/auth';
import { logger } from '../utils/logger';
import { apiService } from './api';

export class AuthService {
  /**
   * Login user
   */
async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  logger.info('Attempting login', { email: credentials.email });
  
  // Mock login for demo accounts
  if (import.meta.env.DEV && (
    credentials.email === 'demo@athlete.com' || 
    credentials.email === 'demo@coach.com'
  )) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: credentials.email === 'demo@coach.com' ? 'coach-1' : 'athlete-1',
      email: credentials.email,
      name: credentials.email === 'demo@coach.com' ? 'Demo Coach' : 'Demo Athlete',
      role: credentials.email === 'demo@coach.com' ? 'coach' : 'athlete',
      createdAt: '2024-01-01T00:00:00Z',
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('auth_token', mockToken);
    
    logger.info('Mock login successful', { userId: mockUser.id });
    return { user: mockUser, token: mockToken };
  }
  
  // Regular API call for real accounts
  const response = await apiService.post<{ user: User; token: string }>('/api/auth/login', {
    email: credentials.email,
    password: credentials.password,
    rememberMe: credentials.rememberMe,
  });
  
  if (!response.success || !response.data) {
    throw new Error(response.error || 'Login failed');
  }
  
  localStorage.setItem('auth_token', response.data.token);
  logger.info('Login successful', { userId: response.data.user.id });
  return response.data;
}

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    logger.info('Attempting registration', { email: data.email });
    
    const response = await apiService.post<{ user: User; token: string }>('/api/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || 'athlete',
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Registration failed');
    }
    
    // Store token
    localStorage.setItem('auth_token', response.data.token);
    
    logger.info('Registration successful', { userId: response.data.user.id });
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/api/auth/logout');
    } catch (error) {
      logger.warn('Logout API call failed, proceeding with local cleanup', error);
    }
    
    localStorage.removeItem('auth_token');
    logger.info('User logged out');
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/api/auth/me');
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to get user profile');
    }
    
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/api/auth/profile', updates);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update profile');
    }
    
    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    const response = await apiService.post('/api/auth/forgot-password', { email });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to request password reset');
    }
    
    logger.info('Password reset requested', { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiService.post('/api/auth/reset-password', {
      token,
      password: newPassword,
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to reset password');
    }
    
    logger.info('Password reset successful');
  }
}

export const authService = new AuthService();