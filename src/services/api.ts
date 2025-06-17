// src/services/api.ts - Updated to handle mock vs real API calls
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { logger } from '@/utils/logger';
import { APP_CONFIG } from '@/utils/constants';
import type { ApiResponse, ApiError } from '@/types/api';

class ApiService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = APP_CONFIG.apiBaseUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          params: config.params,
        });
        
        return config;
      },
      (error) => {
        logger.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.debug(`API Response: ${response.status} ${response.config.url}`, {
          data: response.data,
        });
        return response;
      },
      (error: AxiosError) => {
        this.handleApiError(error);
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private handleApiError(error: AxiosError): void {
    // Don't redirect on auth errors for mock data
    if (error.response?.status === 401 && !this.isMockEndpoint(error.config?.url || '')) {
      logger.warn('Unauthorized access - clearing auth token');
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    logger.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    });
  }

  private isMockEndpoint(url: string): boolean {
    // Add endpoints that should use mock data instead of real API
    const mockEndpoints = ['/api/auth/', '/api/meets/', '/api/coach/'];
    return mockEndpoints.some(endpoint => url.includes(endpoint));
  }

  private formatError(error: AxiosError): ApiError {
    const response = error.response?.data as any;
    
    return {
      code: response?.code || error.code || 'UNKNOWN_ERROR',
      message: response?.message || error.message || 'An unexpected error occurred',
      details: response?.details || { status: error.response?.status },
      timestamp: new Date().toISOString(),
    };
  }

  // Generic HTTP methods - these will work for the ML prediction API
  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.patch(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete(url);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();