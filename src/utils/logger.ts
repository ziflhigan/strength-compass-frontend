// src/utils/logger.ts
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.level = this.getLogLevel();
  }

  private getLogLevel(): LogLevel {
    const envLevel = import.meta.env.VITE_LOG_LEVEL?.toLowerCase();
    switch (envLevel) {
      case 'debug': return LogLevel.DEBUG;
      case 'info': return LogLevel.INFO;
      case 'warn': return LogLevel.WARN;
      case 'error': return LogLevel.ERROR;
      default: return this.isDevelopment ? LogLevel.DEBUG : LogLevel.WARN;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatMessage(level: string, message: string, context?: any): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}] [FitEquity]`;
    
    if (context) {
      console.log(`${prefix} ${message}`, context);
    } else {
      console.log(`${prefix} ${message}`);
    }
  }

  debug(message: string, context?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.formatMessage('DEBUG', message, context);
    }
  }

  info(message: string, context?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.formatMessage('INFO', message, context);
    }
  }

  warn(message: string, context?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.formatMessage('WARN', message, context);
    }
  }

  error(message: string, error?: Error | any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.formatMessage('ERROR', message, error);
      
      // In production, you might want to send errors to a service
      if (!this.isDevelopment && error) {
        this.reportError(message, error);
      }
    }
  }

  private reportError(message: string, error: any): void {
    // TODO: Implement error reporting service (Sentry, LogRocket, etc.)
    console.error('Error reporting not implemented:', { message, error });
  }
}

export const logger = new Logger();