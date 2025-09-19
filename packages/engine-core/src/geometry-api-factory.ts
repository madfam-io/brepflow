/**
 * Geometry API Factory with Environment Awareness
 * Creates appropriate geometry provider based on environment and configuration
 */

import { getConfig, shouldUseMockGeometry } from './config/environment';
import { shouldUseRealWASM, getWASMConfig } from './config/wasm-config';
import type { WorkerAPI } from '@brepflow/types';

// Lazy logger initialization to avoid constructor issues during module loading
let logger: any = null;
const getLogger = () => {
  if (!logger) {
    const { ProductionLogger } = require('@brepflow/engine-occt');
    logger = new ProductionLogger('GeometryAPIFactory');
  }
  return logger;
};

export interface GeometryAPIConfig {
  forceMode?: 'real' | 'mock';
  initTimeout?: number;
  validateOutput?: boolean;
  enableRetry?: boolean;
  retryAttempts?: number;
}

export class GeometryAPIFactory {
  private static realAPI: WorkerAPI | null = null;
  private static mockAPI: WorkerAPI | null = null;
  private static initializationPromise: Promise<WorkerAPI> | null = null;

  /**
   * Get geometry API based on environment configuration
   */
  static async getAPI(options: GeometryAPIConfig = {}): Promise<WorkerAPI> {
    const config = getConfig();
    
    // Determine which API to use
    // FORCE real WASM in development unless explicitly mocked
    const wasmConfig = getWASMConfig();
    const useMock = options.forceMode === 'mock' || 
                   (options.forceMode !== 'real' && !wasmConfig.forceRealWASM && shouldUseMockGeometry());

    getLogger().info('Creating geometry API', {
      useMock,
      environment: config.mode,
      forceMode: options.forceMode,
    });

    if (useMock) {
      return this.getMockAPI();
    } else {
      return this.getRealAPI(options);
    }
  }

  /**
   * Get real OCCT-based geometry API
   */
  private static async getRealAPI(options: GeometryAPIConfig): Promise<WorkerAPI> {
    const config = getConfig();

    // In production, fail fast if mock is requested
    if (config.isProduction && shouldUseMockGeometry()) {
      throw new Error('Mock geometry cannot be used in production mode');
    }

    // Return cached instance if available
    if (this.realAPI) {
      getLogger().debug('Returning cached real geometry API');
      return this.realAPI;
    }

    // Return existing initialization promise if in progress
    if (this.initializationPromise) {
      getLogger().debug('Waiting for existing real API initialization');
      return this.initializationPromise;
    }

    // Start new initialization
    this.initializationPromise = this.initializeRealAPI(options);
    
    try {
      this.realAPI = await this.initializationPromise;
      return this.realAPI;
    } catch (error) {
      this.initializationPromise = null;
      throw error;
    }
  }

  /**
   * Initialize real OCCT API with proper error handling
   */
  private static async initializeRealAPI(options: GeometryAPIConfig): Promise<WorkerAPI> {
    const config = getConfig();

    getLogger().info('Initializing real OCCT geometry API');

    try {
      // Dynamic import to avoid loading in environments where it's not available
      const { ProductionWorkerAPI } = await import('@brepflow/engine-occt');
      
      const api = new ProductionWorkerAPI({
        wasmPath: config.occtWasmPath,
        initTimeout: options.initTimeout || config.occtInitTimeout,
        validateOutput: options.validateOutput ?? config.validateGeometryOutput,
        memoryThreshold: config.workerRestartThresholdMB,
      });

      // Initialize with retry logic if enabled
      if (options.enableRetry) {
        await this.initializeWithRetry(api, options.retryAttempts || 3);
      } else {
        await api.init();
      }

      // Verify initialization
      const health = await api.invoke('HEALTH_CHECK', {});
      if (!(health as any)?.healthy) {
        throw new Error('Geometry API health check failed after initialization');
      }

      getLogger().info('Real OCCT geometry API initialized successfully');
      return api;

    } catch (error) {
      getLogger().error('Failed to initialize real OCCT geometry API', error);

      // In development, optionally fall back to mock if allowed
      if (config.isDevelopment && config.enableMockGeometry) {
        getLogger().warn('Development mode: Falling back to mock geometry after real API failed');
        return this.getMockAPI();
      }
      
      throw new Error(
        `Failed to initialize geometry API: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Initialize API with retry logic
   */
  private static async initializeWithRetry(api: WorkerAPI, attempts: number): Promise<void> {
    for (let i = 0; i < attempts; i++) {
      try {
        await api.init();
        return;
      } catch (error) {
        getLogger().warn(`Geometry API initialization attempt ${i + 1} failed`, error);
        
        if (i === attempts - 1) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  /**
   * Get mock geometry API for development/testing
   */
  private static async getMockAPI(): Promise<WorkerAPI> {
    if (this.mockAPI) {
      getLogger().debug('Returning cached mock geometry API');
      return this.mockAPI;
    }

    getLogger().info('Initializing mock geometry API');

    try {
      const { MockGeometry } = await import('@brepflow/engine-occt');
      this.mockAPI = new MockGeometry();
      await this.mockAPI.init();

      getLogger().info('Mock geometry API initialized successfully');
      return this.mockAPI;
    } catch (error) {
      getLogger().error('Failed to initialize mock geometry API', error);
      throw new Error('Failed to initialize fallback mock geometry API');
    }
  }

  /**
   * Check if real API is available without initializing
   */
  static async isRealAPIAvailable(): Promise<boolean> {
    try {
      // Check for WebAssembly support
      if (typeof WebAssembly === 'undefined') {
        return false;
      }

      // Check for required files (simplified check)
      const config = getConfig();
      const wasmPath = `${config.occtWasmPath}/occt-core.wasm`;
      
      const response = await fetch(wasmPath, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      getLogger().debug('Real API availability check failed', error);
      return false;
    }
  }

  /**
   * Reset factory state (useful for testing)
   */
  static reset(): void {
    this.realAPI = null;
    this.mockAPI = null;
    this.initializationPromise = null;
    getLogger().debug('Geometry API factory reset');
  }

  /**
   * Get current API status
   */
  static getStatus(): {
    hasRealAPI: boolean;
    hasMockAPI: boolean;
    isInitializing: boolean;
  } {
    return {
      hasRealAPI: !!this.realAPI,
      hasMockAPI: !!this.mockAPI,
      isInitializing: !!this.initializationPromise,
    };
  }

  /**
   * Get production API with strict configuration
   */
  static async getProductionAPI(config?: any): Promise<WorkerAPI> {
    return this.getAPI({
      forceMode: 'real',
      validateOutput: true,
      enableRetry: false,
      ...config
    });
  }

  /**
   * Create API for specific use case
   */
  static async createForUseCase(useCase: 'development' | 'testing' | 'production'): Promise<WorkerAPI> {
    switch (useCase) {
      case 'development':
        return this.getAPI({ 
          enableRetry: true,
          retryAttempts: 2,
        });
      
      case 'testing':
        return this.getAPI({ 
          forceMode: 'mock',
          validateOutput: false,
        });
      
      case 'production':
        return this.getAPI({ 
          forceMode: 'real',
          validateOutput: true,
          enableRetry: false,
        });
      
      default:
        throw new Error(`Unknown use case: ${useCase}`);
    }
  }
}

// Convenience exports
export const getGeometryAPI = (forceMock = false) =>
  GeometryAPIFactory.getAPI({ forceMode: forceMock ? 'mock' : undefined });

export const getRealGeometryAPI = () =>
  GeometryAPIFactory.getAPI({ forceMode: 'real' });

export const getMockGeometryAPI = () =>
  GeometryAPIFactory.getAPI({ forceMode: 'mock' });

export const getProductionAPI = (config?: any) =>
  GeometryAPIFactory.getAPI({ forceMode: 'real', ...config });

export const isRealGeometryAvailable = () =>
  GeometryAPIFactory.isRealAPIAvailable();