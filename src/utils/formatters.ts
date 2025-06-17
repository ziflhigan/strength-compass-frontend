// src/utils/formatters.ts
/**
 * Formats a number as weight (kg or lbs)
 */
export const formatWeight = (weight: number, unit: 'kg' | 'lbs' = 'kg'): string => {
  if (unit === 'lbs') {
    return `${(weight * 2.20462).toFixed(1)} lbs`;
  }
  return `${weight.toFixed(1)} kg`;
};

/**
 * Formats a Wilks score
 */
export const formatWilks = (wilks: number): string => {
  return wilks.toFixed(1);
};

/**
 * Formats a percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formats a date for display
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a relative date (e.g., "2 days ago")
 */
export const formatRelativeDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

/**
 * Formats a delta (difference) with appropriate color
 */
export const formatDelta = (delta: number, unit: string = 'kg'): { 
  text: string; 
  color: 'success' | 'danger' | 'muted' 
} => {
  const absValue = Math.abs(delta);
  const sign = delta > 0 ? '+' : delta < 0 ? '-' : '';
  const color = delta > 0 ? 'success' : delta < 0 ? 'danger' : 'muted';
  
  return {
    text: `${sign}${absValue.toFixed(1)} ${unit}`,
    color,
  };
};

/**
 * Gets age group label
 */
export const getAgeGroup = (age: number): string => {
  if (age < 20) return 'Junior';
  if (age < 24) return 'Sub-Junior';
  if (age < 40) return 'Open';
  if (age < 50) return 'Masters 1';
  if (age < 60) return 'Masters 2';
  if (age < 70) return 'Masters 3';
  return 'Masters 4+';
};

/**
 * Gets weight class from bodyweight
 */
export const getWeightClass = (bodyweight: number, sex: 'M' | 'F' | 'Mx'): string => {
  // IPF weight classes (simplified)
  if (sex === 'F') {
    if (bodyweight <= 47) return '47kg';
    if (bodyweight <= 52) return '52kg';
    if (bodyweight <= 57) return '57kg';
    if (bodyweight <= 63) return '63kg';
    if (bodyweight <= 69) return '69kg';
    if (bodyweight <= 76) return '76kg';
    if (bodyweight <= 84) return '84kg';
    return '84kg+';
  } else {
    if (bodyweight <= 59) return '59kg';
    if (bodyweight <= 66) return '66kg';
    if (bodyweight <= 74) return '74kg';
    if (bodyweight <= 83) return '83kg';
    if (bodyweight <= 93) return '93kg';
    if (bodyweight <= 105) return '105kg';
    if (bodyweight <= 120) return '120kg';
    return '120kg+';
  }
};

/**
 * Calculates Wilks score
 */
export const calculateWilks = (total: number, bodyweight: number, sex: 'M' | 'F' | 'Mx'): number => {
  // Simplified Wilks calculation - you'd want to use the official coefficients
  const coefficients = sex === 'F' 
    ? [-125.425539779, 13.71219419, -0.03307250631, -0.001050400051, 9.38773881e-06, -2.3334613e-08]
    : [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08];
  
  let coeff = 0;
  for (let i = 0; i < coefficients.length; i++) {
    coeff += coefficients[i] * Math.pow(bodyweight, i);
  }
  
  return total * 500 / coeff;
};