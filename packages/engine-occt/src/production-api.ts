/**
 * Production OCCT Worker API
 * Manages Web Worker communication with real OCCT geometry operations
 */

import { getConfig } from '@brepflow/engine-core';
import type { WorkerAPI, WorkerRequest, WorkerResponse } from '@brepflow/types';

// Lazy logger initialization to avoid constructor issues during module loading
let logger: any = null;
const getLogger = () => {
  if (!logger) {
    const { ProductionLogger } = require('./production-logger');
    logger = new ProductionLogger('ProductionWorkerAPI');
  }
  return logger;
};

export interface ProductionWorkerConfig {
  wasmPath: string;
  initTimeout: number;
  validateOutput: boolean;
  memoryThreshold: number;
}

export class ProductionWorkerAPI implements WorkerAPI {
  private worker: Worker | null = null;
  private requestId = 0;
  private pendingRequests = new Map<number, {
    resolve: (value: any) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }>();
  private isInitialized = false;
  private config: ProductionWorkerConfig;

  constructor(config: ProductionWorkerConfig) {
    this.config = config;
  }

  async init(): Promise<void> {
    if (this.isInitialized) {
      getLogger().debug('Worker already initialized');
      return;
    }

    getLogger().info('Initializing production OCCT worker');

    // Check environment
    const envConfig = getConfig();
    if (envConfig.isProduction && envConfig.enableMockGeometry) {
      throw new Error('Cannot initialize production worker with mock geometry enabled');
    }

    // Create worker
    try {
      // In production builds, the worker should be pre-built
      // Use robust path resolution to handle bundling scenarios
      let workerUrl: string;
      try {
        // Check if we're in development mode with Vite dev server
        if (import.meta.url.includes('/@fs/')) {
          // Development mode with Vite - use the correct path
          // The worker is in the same dist directory as this file (index.mjs)
          const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/'));
          workerUrl = `${baseUrl}/worker.mjs`;
          getLogger().info('Development mode: using worker from same directory');
        } else if (import.meta.url.includes('/node_modules/')) {
          // Running from node_modules
          workerUrl = new URL('./worker.mjs', import.meta.url).href;
        } else if (import.meta.url.includes('/assets/')) {
          // Production bundle - use relative path from assets
          const workerFile = './worker' + '.mjs';
          workerUrl = new URL(workerFile, import.meta.url).href;
        } else {
          // Other environments - use relative path resolution
          workerUrl = new URL('./worker.mjs', import.meta.url).href;
        }
      } catch (error) {
        getLogger().error('Worker URL resolution error:', error);
        // Final fallback: construct path dynamically to avoid Vite static analysis
        const workerFile = './worker' + '.mjs';
        workerUrl = new URL(workerFile, import.meta.url).href;
      }

      // For development with Vite, simplify to always use worker.mjs in the same directory
      if (import.meta.url.includes('/@fs/')) {
        const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/'));
        workerUrl = `${baseUrl}/worker.mjs`;
      }

      getLogger().info(`Creating worker with URL: ${workerUrl}`);
      getLogger().info(`Current import.meta.url: ${import.meta.url}`);
      this.worker = new Worker(workerUrl, { type: 'module' });
      
      this.setupWorkerHandlers();
      
      // Initialize OCCT
      await this.invoke('INIT', {});
      this.isInitialized = true;
      
      getLogger().info('Production OCCT worker initialized successfully');
    } catch (error) {
      getLogger().error('Failed to initialize production worker', error);
      this.cleanup();
      throw new Error(`Worker initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private setupWorkerHandlers(): void {
    if (!this.worker) return;

    this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const response = event.data;
      
      if (response.id !== undefined) {
        // Handle request response
        const pending = this.pendingRequests.get(response.id);
        if (pending) {
          clearTimeout(pending.timeout);
          this.pendingRequests.delete(response.id);
          
          if (response.success) {
            pending.resolve(response.result);
          } else {
            const error = new Error(response.error?.message || 'Worker operation failed');
            (error as any).code = response.error?.code;
            (error as any).details = response.error?.details;
            pending.reject(error);
          }
        }
      } else {
        // Handle worker events (memory pressure, etc.)
        this.handleWorkerEvent(response);
      }
    };

    this.worker.onerror = (event) => {
      getLogger().error('Worker error', event);
      this.handleWorkerError(new Error(`Worker error: ${event.message}`));
    };

    this.worker.onmessageerror = (event) => {
      getLogger().error('Worker message error', event);
      this.handleWorkerError(new Error('Worker message error'));
    };
  }

  private handleWorkerEvent(event: any): void {
    switch (event.type) {
      case 'MEMORY_PRESSURE':
        getLogger().warn('Worker memory pressure detected', {
          usedMB: event.usedMB,
          threshold: event.threshold,
        });
        // Could trigger worker restart here
        break;
        
      case 'WORKER_ERROR':
        getLogger().error('Worker reported error', event.error);
        break;
        
      default:
        getLogger().debug('Unknown worker event', event);
    }
  }

  private handleWorkerError(error: Error): void {
    // Reject all pending requests
    for (const [id, pending] of this.pendingRequests) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
    this.pendingRequests.clear();
    
    // Mark as not initialized
    this.isInitialized = false;
  }

  async invoke<T>(operation: string, params: any): Promise<T> {
    if (!this.worker) {
      throw new Error('Worker not initialized');
    }

    if (operation !== 'INIT' && !this.isInitialized) {
      throw new Error('Worker not ready - call init() first');
    }

    const requestId = ++this.requestId;
    const request: WorkerRequest = {
      id: requestId,
      type: operation,
      params,
    };

    return new Promise<T>((resolve, reject) => {
      // Set up timeout
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(requestId);
        reject(new Error(`Operation ${operation} timed out after ${this.config.initTimeout}ms`));
      }, this.config.initTimeout);

      // Store pending request
      this.pendingRequests.set(requestId, {
        resolve,
        reject,
        timeout,
      });

      // Send request
      this.worker!.postMessage(request);
      
      getLogger().debug(`Sent request ${requestId}: ${operation}`, params);
    });
  }

  async shutdown(): Promise<void> {
    if (this.worker) {
      try {
        // Attempt graceful shutdown
        await this.invoke('SHUTDOWN', {}).catch(() => {
          // Ignore shutdown errors
        });
      } finally {
        this.cleanup();
      }
    }
  }

  private cleanup(): void {
    // Clear pending requests
    for (const [id, pending] of this.pendingRequests) {
      clearTimeout(pending.timeout);
      pending.reject(new Error('Worker terminated'));
    }
    this.pendingRequests.clear();

    // Terminate worker
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }

    this.isInitialized = false;
    getLogger().info('Worker cleaned up');
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.invoke('HEALTH_CHECK', {});
      return !!(result as any)?.healthy;
    } catch (error) {
      getLogger().error('Health check failed', error);
      return false;
    }
  }

  // Memory management
  async getMemoryUsage(): Promise<number> {
    try {
      const result = await this.invoke('HEALTH_CHECK', {});
      return (result as any)?.memoryUsage || 0;
    } catch (error) {
      getLogger().error('Failed to get memory usage', error);
      return 0;
    }
  }

  // Force cleanup of geometry objects
  async cleanupGeometry(): Promise<void> {
    try {
      await this.invoke('CLEANUP', {});
    } catch (error) {
      getLogger().error('Cleanup failed', error);
    }
  }

  // Tessellate shape for rendering
  async tessellate(shapeId: string, deflection: number): Promise<any> {
    try {
      const result = await this.invoke('TESSELLATE', {
        shapeId,
        deflection,
      });
      return result;
    } catch (error) {
      getLogger().error('Tessellation failed', error);
      throw error;
    }
  }

  // Dispose of a shape handle
  async dispose(handleId: string): Promise<void> {
    try {
      await this.invoke('DISPOSE', { handleId });
    } catch (error) {
      getLogger().error('Dispose failed', error);
    }
  }

  // Get worker status
  getStatus(): {
    initialized: boolean;
    pendingRequests: number;
    workerId: string | null;
  } {
    return {
      initialized: this.isInitialized,
      pendingRequests: this.pendingRequests.size,
      workerId: this.worker ? 'production-worker' : null,
    };
  }
}

// Factory function for easy creation
export function createProductionAPI(overrides: Partial<ProductionWorkerConfig> = {}): ProductionWorkerAPI {
  const config = getConfig();
  
  const fullConfig: ProductionWorkerConfig = {
    wasmPath: config.occtWasmPath,
    initTimeout: config.occtInitTimeout,
    validateOutput: config.validateGeometryOutput,
    memoryThreshold: config.workerRestartThresholdMB,
    ...overrides,
  };

  return new ProductionWorkerAPI(fullConfig);
}