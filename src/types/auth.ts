import type { AthleteProfile } from "./athlete";

// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'athlete' | 'coach' | 'admin';
  profile?: AthleteProfile;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
  role?: 'athlete' | 'coach';
}