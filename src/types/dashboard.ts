import type { AthleteProfile } from "./athlete";
import type { PredictionResponse } from "./prediction";
import type { MeetEntry } from "./meet";
import type { MeetPerformance } from "./meet";
import type { Equipment } from "./athlete";

// src/types/dashboard.ts
export interface DashboardData {
  athlete: AthleteProfile;
  latestPrediction?: PredictionResponse;
  recentMeets: MeetEntry[];
  progressData: MeetPerformance[];
  insights: EquityInsight[];
  recommendations: string[];
}

export interface EquityInsight {
  id: string;
  type: 'demographic' | 'equipment' | 'age' | 'experience';
  title: string;
  description: string;
  relevantResources: Resource[];
  priority: 'low' | 'medium' | 'high';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'community' | 'tool' | 'research';
  tags: string[];
  relevantFor: {
    sex?: ('M' | 'F' | 'Mx')[];
    ageRange?: [number, number];
    equipment?: Equipment[];
    experience?: string[];
  };
}