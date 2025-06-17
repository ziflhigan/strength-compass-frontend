import type { Equipment } from "./athlete";

export interface MeetEntry {
  id: string;
  athleteId: string;
  meetName: string;
  meetDate: string;
  federation?: string;
  weightClass: string;
  bodyweight: number;
  equipment: Equipment;
  actualSquat: number;
  actualBench: number;
  actualDeadlift: number;
  actualTotal: number;
  wilksScore?: number;
  predictedTotal?: number;
  delta?: number; // actual - predicted
  placement?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeetPerformance {
  date: string;
  total: number;
  predicted: number;
  bodyweight: number;
  wilks: number;
  equipment: Equipment;
}