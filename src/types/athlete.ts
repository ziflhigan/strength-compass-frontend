// src/types/athlete.ts
export interface AthleteProfile {
  id?: string;
  sex: 'M' | 'F' | 'Mx';
  age: number;
  bodyweight: number; // in kg
  equipment: Equipment;
  weightClass?: string;
  experience?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  goals?: string;
}

export type Equipment = 'Raw' | 'Wraps' | 'Single-ply' | 'Multi-ply' | 'Straps' | 'Unlimited';

export interface AthleteStats {
  currentSquat?: number;
  currentBench?: number;
  currentDeadlift?: number;
  currentTotal?: number;
}