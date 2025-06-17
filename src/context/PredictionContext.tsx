// src/context/PredictionContext.tsx
import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { 
  PredictionResponse, 
  WhatIfScenario 
} from '../types/prediction';
import type { AthleteProfile } from '../types/athlete';
import { predictionService } from '../services/prediction';
import { logger } from '../utils/logger';

interface PredictionState {
  currentProfile: AthleteProfile | null;
  currentPrediction: PredictionResponse | null;
  whatIfScenarios: Array<{ scenario: WhatIfScenario; prediction: PredictionResponse }>;
  isLoading: boolean;
  error: string | null;
}

interface PredictionContextType extends PredictionState {
  updateProfile: (profile: AthleteProfile) => void;
  getPrediction: (profile: AthleteProfile) => Promise<PredictionResponse>;
  getWhatIfPrediction: (scenario: WhatIfScenario) => Promise<PredictionResponse>;
  clearPredictions: () => void;
  clearError: () => void;
}

type PredictionAction = 
  | { type: 'PREDICTION_START' }
  | { type: 'PREDICTION_SUCCESS'; payload: PredictionResponse }
  | { type: 'PREDICTION_ERROR'; payload: string }
  | { type: 'UPDATE_PROFILE'; payload: AthleteProfile }
  | { type: 'ADD_WHAT_IF'; payload: { scenario: WhatIfScenario; prediction: PredictionResponse } }
  | { type: 'CLEAR_PREDICTIONS' }
  | { type: 'CLEAR_ERROR' };

const initialState: PredictionState = {
  currentProfile: null,
  currentPrediction: null,
  whatIfScenarios: [],
  isLoading: false,
  error: null,
};

const predictionReducer = (state: PredictionState, action: PredictionAction): PredictionState => {
  switch (action.type) {
    case 'PREDICTION_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'PREDICTION_SUCCESS':
      return {
        ...state,
        currentPrediction: action.payload,
        isLoading: false,
        error: null,
      };
    case 'PREDICTION_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentProfile: action.payload,
        // Clear predictions when profile changes significantly
        currentPrediction: null,
        whatIfScenarios: [],
      };
    case 'ADD_WHAT_IF':
      return {
        ...state,
        whatIfScenarios: [...state.whatIfScenarios, action.payload],
        isLoading: false,
        error: null,
      };
    case 'CLEAR_PREDICTIONS':
      return {
        ...state,
        currentPrediction: null,
        whatIfScenarios: [],
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

interface PredictionProviderProps {
  children: ReactNode;
}

export const PredictionProvider: React.FC<PredictionProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(predictionReducer, initialState);

  const updateProfile = (profile: AthleteProfile): void => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
    logger.info('Athlete profile updated', { profile });
  };

  const getPrediction = async (profile: AthleteProfile): Promise<PredictionResponse> => {
    try {
      dispatch({ type: 'PREDICTION_START' });
      
      const prediction = await predictionService.getPrediction({
        sex: profile.sex,
        age: profile.age,
        bw: profile.bodyweight,
        equip: profile.equipment,
      });

      dispatch({ type: 'PREDICTION_SUCCESS', payload: prediction });
      logger.info('Prediction retrieved successfully', { prediction });
      
      return prediction;
    } catch (error: any) {
      const message = error.message || 'Failed to get prediction';
      logger.error('Prediction failed', error);
      dispatch({ type: 'PREDICTION_ERROR', payload: message });
      throw error;
    }
  };

  const getWhatIfPrediction = async (scenario: WhatIfScenario): Promise<PredictionResponse> => {
    if (!state.currentProfile) {
      throw new Error('No current profile set for what-if scenario');
    }

    try {
      dispatch({ type: 'PREDICTION_START' });
      
      const prediction = await predictionService.getWhatIfPrediction(
        state.currentProfile,
        scenario
      );

      dispatch({ 
        type: 'ADD_WHAT_IF', 
        payload: { scenario, prediction } 
      });
      
      logger.info('What-if prediction retrieved', { scenario, prediction });
      
      return prediction;
    } catch (error: any) {
      const message = error.message || 'Failed to get what-if prediction';
      logger.error('What-if prediction failed', error);
      dispatch({ type: 'PREDICTION_ERROR', payload: message });
      throw error;
    }
  };

  const clearPredictions = (): void => {
    dispatch({ type: 'CLEAR_PREDICTIONS' });
    logger.debug('Predictions cleared');
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: PredictionContextType = {
    ...state,
    updateProfile,
    getPrediction,
    getWhatIfPrediction,
    clearPredictions,
    clearError,
  };

  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = (): PredictionContextType => {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
};