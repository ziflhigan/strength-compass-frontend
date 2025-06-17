// src/services/storage.ts
import { logger } from '../utils/logger';

/**
 * Local storage service with error handling and logging
 */
export class StorageService {
  private prefix = 'fitequity_';

  /**
   * Store data in localStorage
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(`${this.prefix}${key}`, serialized);
      logger.debug(`Stored data in localStorage: ${key}`);
    } catch (error) {
      logger.error(`Failed to store data in localStorage: ${key}`, error);
    }
  }

  /**
   * Retrieve data from localStorage
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(`${this.prefix}${key}`);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      logger.error(`Failed to retrieve data from localStorage: ${key}`, error);
      return defaultValue;
    }
  }

  /**
   * Remove data from localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(`${this.prefix}${key}`);
      logger.debug(`Removed data from localStorage: ${key}`);
    } catch (error) {
      logger.error(`Failed to remove data from localStorage: ${key}`, error);
    }
  }

  /**
   * Clear all app data from localStorage
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
      keys.forEach(key => localStorage.removeItem(key));
      logger.info('Cleared all app data from localStorage');
    } catch (error) {
      logger.error('Failed to clear localStorage', error);
    }
  }

  /**
   * Check if localStorage is available
   */
  isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

export const storageService = new StorageService();