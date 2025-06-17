// src/hooks/usePrediction.ts (alternative to context)
import { useState, useCallback } from 'react';
import { predictionService } from '../services/prediction';
import { useApi } from './useApi';
import type { 
  PredictionResponse, 
  WhatIfScenario 
} from '../types/prediction';
import type { AthleteProfile } from '../types/athlete';

/**
 * Custom hook for prediction-related operations
 */
export function usePredictionHook() {
  const [currentProfile, setCurrentProfile] = useState<AthleteProfile | null>(null);
  const [predictions, setPredictions] = useState<PredictionResponse[]>([]);
  
  const {
    data: latestPrediction,
    isLoading,
    error,
    execute: executePrediction,
  } = useApi(predictionService.getPrediction.bind(predictionService) as any);

  const getPrediction = useCallback(
    async (profile: AthleteProfile) => {
      setCurrentProfile(profile);
      
      const predictionRequest = {
        sex: profile.sex,
        age: profile.age,
        bw: profile.bodyweight,
        equip: profile.equipment,
      };
      
      const result = await executePrediction(predictionRequest);
      setPredictions(prev => [result, ...prev]);
      return result;
    },
    [executePrediction]
  );

  const getWhatIfPrediction = useCallback(
    async (scenario: WhatIfScenario) => {
      if (!currentProfile) {
        throw new Error('No current profile set for what-if scenario');
      }
      
      const adjustedProfile = {
        ...currentProfile,
        age: currentProfile.age + scenario.ageAdjustment,
        bodyweight: currentProfile.bodyweight + scenario.bodyweightAdjustment,
        equipment: scenario.equipmentChange || currentProfile.equipment,
      };
      
      const predictionRequest = {
        sex: adjustedProfile.sex,
        age: adjustedProfile.age,
        bw: adjustedProfile.bodyweight,
        equip: adjustedProfile.equipment,
      };
      
      return executePrediction(predictionRequest);
    },
    [currentProfile, executePrediction]
  );

  return {
    currentProfile,
    latestPrediction,
    predictions,
    isLoading,
    error,
    getPrediction,
    getWhatIfPrediction,
    setCurrentProfile,
  };
}