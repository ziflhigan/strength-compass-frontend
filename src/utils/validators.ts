// src/utils/validators.ts
import { VALIDATION_RULES, EQUIPMENT_OPTIONS } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates athlete profile data
 */
export const validateAthleteProfile = (profile: Partial<any>): ValidationResult => {
  const errors: string[] = [];
  
  // Age validation
  if (!profile.age || profile.age < VALIDATION_RULES.age.min || profile.age > VALIDATION_RULES.age.max) {
    errors.push(`Age must be between ${VALIDATION_RULES.age.min} and ${VALIDATION_RULES.age.max}`);
  }
  
  // Bodyweight validation
  if (!profile.bodyweight || profile.bodyweight < VALIDATION_RULES.bodyweight.min || profile.bodyweight > VALIDATION_RULES.bodyweight.max) {
    errors.push(`Bodyweight must be between ${VALIDATION_RULES.bodyweight.min} and ${VALIDATION_RULES.bodyweight.max} kg`);
  }
  
  // Sex validation
  if (!profile.sex || !['M', 'F', 'Mx'].includes(profile.sex)) {
    errors.push('Sex must be specified');
  }
  
  // Equipment validation
  if (!profile.equipment || !EQUIPMENT_OPTIONS.map(e => e.value).includes(profile.equipment)) {
    errors.push('Equipment type must be specified');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_RULES.emailRegex.test(email);
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (password.length < VALIDATION_RULES.passwordLength.min) {
    errors.push(`Password must be at least ${VALIDATION_RULES.passwordLength.min} characters`);
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};