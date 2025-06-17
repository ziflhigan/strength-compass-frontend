import type { Equipment } from "./athlete";

// src/types/prediction.ts
export interface PredictionRequest {
  sex: 'M' | 'F' | 'Mx';
  age: number;
  bw: number; // bodyweight in kg
  equip: Equipment;
}

export interface PredictionResponse {
  total_pred: number;
  squat_pred?: number;
  bench_pred?: number;
  deadlift_pred?: number;
  wilks_pred?: number;
  pi_low?: number; // prediction interval low
  pi_high?: number; // prediction interval high
  percentile?: number;
  confidence?: number;
  metadata?: {
    model_version: string;
    prediction_date: string;
    features_used: string[];
  };
}

export interface WhatIfScenario {
  ageAdjustment: number; // +/- years
  bodyweightAdjustment: number; // +/- kg
  equipmentChange?: Equipment;
  scenario_name?: string;
}