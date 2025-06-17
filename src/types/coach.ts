import type { AthleteProfile } from "./athlete";
import type { Equipment } from "./athlete";
import type { MeetEntry } from "./meet";
import type { PredictionResponse } from "./prediction";

// src/types/coach.ts
export interface CoachDashboardData {
  athletes: AthleteWithMetrics[];
  teamStats: TeamStatistics;
  upcomingMeets: MeetEntry[];
  alerts: CoachAlert[];
}

export interface AthleteWithMetrics extends AthleteProfile {
  id: string;
  name: string;
  email: string;
  lastPrediction?: PredictionResponse;
  recentProgress: number; // percentage change
  nextMeet?: MeetEntry;
  riskFlags: string[];
  predictionAccuracy: number; // MAE from recent meets
}

export interface TeamStatistics {
  totalAthletes: number;
  averageProgress: number;
  upcomingMeetsCount: number;
  equipmentDistribution: Record<Equipment, number>;
  ageDistribution: Record<string, number>;
  sexDistribution: Record<string, number>;
}

export interface CoachAlert {
  id: string;
  athleteId: string;
  athleteName: string;
  type: 'performance_drop' | 'meet_approaching' | 'prediction_outlier' | 'injury_risk';
  severity: 'low' | 'medium' | 'high';
  message: string;
  actionRequired: boolean;
  createdAt: string;
}