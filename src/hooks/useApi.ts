// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { logger } from '../utils/logger';
import type { ApiResponse, ApiError } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

/**
 * Custom hook for API calls with loading and error states
 */
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        logger.debug('API call started', { function: apiFunction.name, args });
        const response = await apiFunction(...args);
        
        if (!response.success || !response.data) {
          throw new Error(response.error || 'API call failed');
        }
        
        setState(prev => ({ ...prev, data: response.data!, isLoading: false }));
        logger.debug('API call completed successfully', { data: response.data });
        
        return response.data!;
      } catch (error: any) {
        const apiError: ApiError = {
          code: error.code || 'UNKNOWN_ERROR',
          message: error.message || 'An unexpected error occurred',
          details: error.details || {},
          timestamp: new Date().toISOString(),
        };
        
        setState(prev => ({ ...prev, error: apiError, isLoading: false }));
        logger.error('API call failed', { error: apiError });
        
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}