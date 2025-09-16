/**
 * Production-ready logging system
 * Structured logging with proper levels and no console.log in production
 */

import { getConfig } from '@brepflow/engine-core/src/config/environment';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  data?: any;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

export class ProductionLogger {
  private context: string;
  private logLevel: LogLevel;
  private buffer: LogEntry[] = [];
  private maxBufferSize = 100;

  constructor(context: string) {
    this.context = context;
    this.logLevel = getConfig().logLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];
    const currentIndex = levels.indexOf(this.logLevel);
    const messageIndex = levels.indexOf(level);
    return messageIndex <= currentIndex;
  }

  private createEntry(level: LogLevel, message: string, data?: any): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
    };

    if (data !== undefined) {
      if (data instanceof Error) {
        entry.error = {
          message: data.message,
          stack: data.stack,
          code: (data as any).code,
        };
      } else {
        entry.data = data;
      }
    }

    return entry;
  }

  private emit(entry: LogEntry): void {
    // Add to buffer for potential batch sending
    this.buffer.push(entry);
    if (this.buffer.length > this.maxBufferSize) {
      this.buffer.shift();
    }

    // In production, send to logging service
    if (getConfig().isProduction) {
      this.sendToLoggingService(entry);
    } else {
      // In development, use console
      this.logToConsole(entry);
    }
  }

  private logToConsole(entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] [${entry.context}]`;
    const message = `${prefix} ${entry.message}`;

    switch (entry.level) {
      case 'error':
        console.error(message, entry.error || entry.data || '');
        break;
      case 'warn':
        console.warn(message, entry.data || '');
        break;
      case 'info':
        console.info(message, entry.data || '');
        break;
      case 'debug':
        console.debug(message, entry.data || '');
        break;
    }
  }

  private sendToLoggingService(entry: LogEntry): void {
    // Send to Sentry if configured
    if (getConfig().enableErrorReporting && getConfig().sentryDSN) {
      if (entry.level === 'error') {
        // Would integrate with Sentry here
        // Sentry.captureException(entry.error || new Error(entry.message));
      }
    }

    // Send to centralized logging service
    if (typeof fetch !== 'undefined') {
      // Batch logs and send periodically
      // This is a placeholder for actual implementation
      this.scheduleBatchSend();
    }
  }

  private batchSendTimer: NodeJS.Timeout | null = null;

  private scheduleBatchSend(): void {
    if (this.batchSendTimer) return;

    this.batchSendTimer = setTimeout(() => {
      this.sendBatch();
      this.batchSendTimer = null;
    }, 5000); // Send every 5 seconds
  }

  private async sendBatch(): Promise<void> {
    if (this.buffer.length === 0) return;

    const batch = [...this.buffer];
    this.buffer = [];

    try {
      // In production, this would send to your logging endpoint
      if (getConfig().isProduction && typeof fetch !== 'undefined') {
        await fetch('/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ logs: batch }),
        }).catch(err => {
          // Silently fail to avoid recursive logging
          this.buffer.unshift(...batch); // Re-add failed logs
        });
      }
    } catch (error) {
      // Re-add logs to buffer if send failed
      this.buffer.unshift(...batch);
    }
  }

  // Public logging methods
  error(message: string, error?: Error | any): void {
    if (this.shouldLog('error')) {
      this.emit(this.createEntry('error', message, error));
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      this.emit(this.createEntry('warn', message, data));
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      this.emit(this.createEntry('info', message, data));
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      this.emit(this.createEntry('debug', message, data));
    }
  }

  // Performance logging
  startTimer(label: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.debug(`${label} took ${duration.toFixed(2)}ms`);
      
      if (getConfig().enablePerformanceMonitoring) {
        this.emit(this.createEntry('info', 'performance', {
          label,
          duration,
          timestamp: Date.now(),
        }));
      }
    };
  }

  // Flush logs (useful for cleanup)
  async flush(): Promise<void> {
    if (this.buffer.length > 0) {
      await this.sendBatch();
    }
  }

  // Get buffered logs (for debugging)
  getBuffer(): LogEntry[] {
    return [...this.buffer];
  }

  // Clear buffer
  clearBuffer(): void {
    this.buffer = [];
  }
}

// Global logger instance
let globalLogger: ProductionLogger | null = null;

export function getLogger(context?: string): ProductionLogger {
  if (!globalLogger) {
    globalLogger = new ProductionLogger(context || 'App');
  }
  return context ? new ProductionLogger(context) : globalLogger;
}

// Export convenience methods
export const logger = {
  error: (message: string, error?: Error) => getLogger().error(message, error),
  warn: (message: string, data?: any) => getLogger().warn(message, data),
  info: (message: string, data?: any) => getLogger().info(message, data),
  debug: (message: string, data?: any) => getLogger().debug(message, data),
};