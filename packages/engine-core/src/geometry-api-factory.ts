/**
 * Geometry API Factory with Environment Awareness
 * Creates appropriate geometry provider based on environment and configuration
 */

import { getConfig } from './config/environment';
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
  private static wasmAssetCheck: Promise<void> | null = null;
  private static wasmAssetsVerified = false;

  /**
   * Get geometry API based on environment configuration
   */
  static async getAPI(options: GeometryAPIConfig = {}): Promise<WorkerAPI> {
    const config = getConfig();
    
    // Determine which API to use
    // FORCE real WASM in development unless explicitly mocked
    const wasmConfig = getWASMConfig();
    const requestMock = options.forceMode === 'mock';
    const isTestEnvironment = config.mode === 'test';

    if (requestMock && !isTestEnvironment) {
      throw new Error('Mock geometry API is only available when NODE_ENV is set to test');
    }

    const useReal = options.forceMode === 'real' || !requestMock;

    getLogger().info('Creating geometry API', {
      useReal,
      environment: config.mode,
      forceMode: options.forceMode ?? 'auto',
    });

    if (!useReal) {
      return this.getMockAPI();
    }

    if (!wasmConfig.forceRealWASM && !shouldUseRealWASM()) {
      getLogger().warn('WASM configuration does not force real OCCT - overriding to ensure real geometry usage');
    }

    return this.getRealAPI(options);
  }

  /**
   * Get real OCCT-based geometry API
   */
  private static async getRealAPI(options: GeometryAPIConfig): Promise<WorkerAPI> {
    const config = getConfig();

    // In production, fail fast if mock is requested
    if (config.mode !== 'test' && options.forceMode === 'mock') {
      throw new Error('Mock geometry cannot be used outside of test mode');
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

    await this.ensureWasmAssets(config.occtWasmPath);

    try {
      // Dynamic import to avoid loading in environments where it's not available
      const { createProductionAPI } = await import('@brepflow/engine-occt');

      const api = createProductionAPI({
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
    const config = getConfig();
    if (config.mode !== 'test') {
      throw new Error('Mock geometry API is only available in test mode');
    }

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
      const config = getConfig();
      await this.ensureWasmAssets(config.occtWasmPath);
      return true;
    } catch (error) {
      getLogger().debug('Real API availability check failed', error);
      return false;
    }
  }

  private static async ensureWasmAssets(wasmPath: string): Promise<void> {
    if (this.wasmAssetsVerified) {
      return;
    }

    if (this.wasmAssetCheck) {
      return this.wasmAssetCheck;
    }

    this.wasmAssetCheck = this.verifyWasmAssets(wasmPath)
      .then(() => {
        this.wasmAssetsVerified = true;
      })
      .finally(() => {
        this.wasmAssetCheck = null;
      });

    return this.wasmAssetCheck;
  }

  private static async verifyWasmAssets(wasmPath: string): Promise<void> {
    const requiredArtifacts = ['occt-core.wasm', 'occt.js', 'occt-core.js'];
    const sanitizedBase = wasmPath.replace(/\/$/, '');

    try {
      const isBrowser = typeof window !== 'undefined';
      const isRemote = /^https?:\/\//i.test(sanitizedBase) || sanitizedBase.startsWith('//');
      const shouldUseFetch = isBrowser || isRemote;

      if (!shouldUseFetch && typeof process !== 'undefined') {
        const path = await import('node:path');
        const fs = await import('node:fs/promises');

        const basePath = path.isAbsolute(sanitizedBase)
          ? sanitizedBase
          : path.resolve(process.cwd(), sanitizedBase);

        const missing: string[] = [];

        for (const artifact of requiredArtifacts) {
          const candidate = path.join(basePath, artifact);
          try {
            await fs.access(candidate);
          } catch {
            missing.push(candidate);
          }
        }

        if (missing.length > 0) {
          throw new Error(`Missing OCCT artifacts: ${missing.join(', ')}`);
        }

        return;
      }

      if (typeof fetch !== 'function') {
        throw new Error('Global fetch API is not available to verify OCCT assets');
      }

      const fetchBase = sanitizedBase.startsWith('//')
        ? `${(globalThis as any)?.location?.protocol ?? 'https:'}${sanitizedBase}`
        : sanitizedBase;

      const missing: string[] = [];

      await Promise.all(requiredArtifacts.map(async artifact => {
        const url = `${fetchBase}/${artifact}`;
        try {
          const response = await fetch(url, { method: 'HEAD' });
          if (!response.ok) {
            missing.push(url);
          }
        } catch {
          missing.push(url);
        }
      }));

      if (missing.length > 0) {
        throw new Error(`Missing OCCT artifacts: ${missing.join(', ')}`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      throw new Error(`OCCT asset verification failed (${wasmPath}): ${reason}`);
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

export const getProductionAPI = (config?: any) =>
  GeometryAPIFactory.getAPI({ forceMode: 'real', ...config });

export const isRealGeometryAvailable = () =>
  GeometryAPIFactory.isRealAPIAvailable();
