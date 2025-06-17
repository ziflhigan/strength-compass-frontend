// src/services/prediction.ts
import type { 
  PredictionRequest, 
  PredictionResponse, 
  WhatIfScenario, 
} from '../types/prediction';
import type { AthleteProfile } from '../types/athlete';
import { logger } from '../utils/logger';
import { apiService } from './api';

export class PredictionService {
  /**
   * Get strength prediction for an athlete
   */
  async getPrediction(request: PredictionRequest): Promise<PredictionResponse> {
    logger.info('Requesting strength prediction', request);
    
    const response = await apiService.post<PredictionResponse>('/api/predict', request);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to get prediction');
    }
    
    logger.info('Prediction received', response.data);
    return response.data;
  }

  /**
   * Get what-if scenario predictions
   */
  async getWhatIfPrediction(
    baseProfile: AthleteProfile, 
    scenario: WhatIfScenario
  ): Promise<PredictionResponse> {
    const request: PredictionRequest = {
      sex: baseProfile.sex,
      age: baseProfile.age + scenario.ageAdjustment,
      bw: baseProfile.bodyweight + scenario.bodyweightAdjustment,
      equip: scenario.equipmentChange || baseProfile.equipment,
    };
    
    logger.info('Requesting what-if prediction', { baseProfile, scenario, request });
    
    return this.getPrediction(request);
  }

  /**
   * Get peer comparison data
   */
  async getPeerComparison(profile: AthleteProfile): Promise<{
    percentile: number;
    averageForDemographic: number;
    sampleSize: number;
    distribution: Array<{ range: string; count: number; percentage: number }>;
  }> {
    const response = await apiService.post('/api/peer-comparison', {
      sex: profile.sex,
      age: profile.age,
      bodyweight: profile.bodyweight,
      equipment: profile.equipment,
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to get peer comparison');
    }
    
    return response.data as {
      percentile: number;
      averageForDemographic: number;
      sampleSize: number;
      distribution: Array<{ range: string; count: number; percentage: number }>;
    };
  }

  /**
   * Get model explanation/feature importance
   */
  async getModelExplanation(): Promise<{
    features: Array<{ name: string; importance: number; description: string }>;
    modelInfo: {
      algorithm: string;
      accuracy: number;
      lastTrained: string;
      sampleSize: number;
    };
  }> {
    const response = await apiService.get('/api/model/explanation');
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to get model explanation');
    }
    
    return response.data as {
      features: Array<{ name: string; importance: number; description: string }>;
      modelInfo: {
        algorithm: string;
        accuracy: number;
        lastTrained: string;
        sampleSize: number;
      };
    };
  }
}

export const predictionService = new PredictionService();