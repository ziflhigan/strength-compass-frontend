// src/services/auth.ts - Updated with Mock Data
import { logger } from '@/utils/logger';
import type { User, LoginCredentials, RegisterData } from '@/types';

export class AuthService {
  private mockUsers: User[] = [
    {
      id: 'athlete-1',
      email: 'demo@athlete.com',
      name: 'Sarah Johnson',
      role: 'athlete',
      profile: {
        sex: 'F',
        age: 28,
        bodyweight: 68.5,
        equipment: 'Raw',
        experience: 'Intermediate',
        goals: 'Improve my total and compete at nationals this year.',
      },
      createdAt: '2024-01-15T10:00:00Z',
      lastLoginAt: '2024-06-17T08:30:00Z',
    },
    {
      id: 'athlete-2',
      email: 'athlete2@demo.com',
      name: 'Marcus Chen',
      role: 'athlete',
      profile: {
        sex: 'M',
        age: 32,
        bodyweight: 82.1,
        equipment: 'Wraps',
        experience: 'Advanced',
        goals: 'Break the 600kg total barrier.',
      },
      createdAt: '2024-02-01T14:20:00Z',
      lastLoginAt: '2024-06-16T19:45:00Z',
    },
    {
      id: 'coach-1',
      email: 'demo@coach.com',
      name: 'Coach Elena Rodriguez',
      role: 'coach',
      createdAt: '2023-09-10T12:00:00Z',
      lastLoginAt: '2024-06-17T07:15:00Z',
    },
  ];

  /**
   * Mock login with predefined demo accounts
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    logger.info('Attempting mock login', { email: credentials.email });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // For demo purposes, accept any password for demo accounts
    // In real app, you'd verify the password hash
    if (credentials.password.length < 3) {
      throw new Error('Invalid email or password');
    }
    
    // Update last login
    user.lastLoginAt = new Date().toISOString();
    
    const mockToken = `mock-jwt-${user.id}-${Date.now()}`;
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('current_user', JSON.stringify(user));
    
    logger.info('Mock login successful', { 
      userId: user.id, 
      role: user.role,
      name: user.name 
    });
    
    return { user, token: mockToken };
  }

  /**
   * Mock registration
   */
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    logger.info('Attempting mock registration', { email: data.email });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = this.mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `${data.role}-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role || 'athlete',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    
    // Add to mock database
    this.mockUsers.push(newUser);
    
    const mockToken = `mock-jwt-${newUser.id}-${Date.now()}`;
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('current_user', JSON.stringify(newUser));
    
    logger.info('Mock registration successful', { 
      userId: newUser.id, 
      role: newUser.role 
    });
    
    return { user: newUser, token: mockToken };
  }

  /**
   * Mock logout
   */
  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    logger.info('User logged out');
  }

  /**
   * Get current user from localStorage
   */
  async getCurrentUser(): Promise<User> {
    const userJson = localStorage.getItem('current_user');
    if (!userJson) {
      throw new Error('No authenticated user found');
    }
    
    try {
      const user = JSON.parse(userJson) as User;
      logger.debug('Retrieved current user from storage', { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Failed to parse stored user data', error);
      throw new Error('Invalid user session');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    logger.info('Updating user profile', { updates });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentUser = await this.getCurrentUser();
    const updatedUser = { ...currentUser, ...updates };
    
    // Update in mock database
    const userIndex = this.mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      this.mockUsers[userIndex] = updatedUser;
    }
    
    // Update localStorage
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    
    logger.info('Profile updated successfully', { userId: updatedUser.id });
    return updatedUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('current_user');
    return !!(token && user);
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Request password reset (mock)
   */
  async requestPasswordReset(email: string): Promise<void> {
    logger.info('Mock password reset requested', { email });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would send an email
    logger.info('Password reset email sent (mock)', { email });
  }

  /**
   * Reset password with token (mock)
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    logger.info('Mock password reset', { token });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    logger.info('Password reset successful (mock)');
  }

  /**
   * Get demo account credentials for testing
   */
  getDemoAccounts() {
    return [
      { email: 'demo@athlete.com', password: 'demo123', role: 'athlete' },
      { email: 'demo@coach.com', password: 'demo123', role: 'coach' },
    ];
  }
}

export const authService = new AuthService();
