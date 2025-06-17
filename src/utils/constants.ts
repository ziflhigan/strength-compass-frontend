// src/utils/constants.ts
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Strength Compass',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  version: '1.0.0',
  author: 'FitEquity Analytics Team',
} as const;

export const EQUIPMENT_OPTIONS = [
  { value: 'Raw', label: 'Raw (No Equipment)', description: 'Belt only' },
  { value: 'Wraps', label: 'Raw with Wraps', description: 'Belt + knee wraps' },
  { value: 'Single-ply', label: 'Single-ply', description: 'Single-layer supportive suit' },
  { value: 'Multi-ply', label: 'Multi-ply', description: 'Multi-layer supportive suit' },
  { value: 'Straps', label: 'Straps', description: 'Lifting straps allowed' },
  { value: 'Unlimited', label: 'Unlimited', description: 'Any supportive equipment' },
] as const;

export const SEX_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'Mx', label: 'Mixed/Other' },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'Beginner', label: 'Beginner', description: '< 1 year lifting' },
  { value: 'Intermediate', label: 'Intermediate', description: '1-3 years lifting' },
  { value: 'Advanced', label: 'Advanced', description: '3-5 years lifting' },
  { value: 'Elite', label: 'Elite', description: '5+ years, competitive' },
] as const;

export const VALIDATION_RULES = {
  age: { min: 10, max: 90 },
  bodyweight: { min: 30, max: 300 }, // kg
  lifts: { min: 0, max: 1000 }, // kg
  nameLength: { min: 2, max: 50 },
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordLength: { min: 8, max: 128 },
} as const;

export const CHART_COLORS = {
  primary: '#3b82f6',
  strength: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#06b6d4',
  muted: '#6b7280',
  background: '#f8fafc',
} as const;