/**
 * Environment configuration management
 * Provides type-safe access to environment variables with validation
 */

export interface EnvironmentConfig {
  // Application
  mode: 'production' | 'development' | 'test';
  isProduction: boolean;
  isDevelopment: boolean;

  // Geometry Engine
  enableMockGeometry: boolean;
  requireRealOCCT: boolean;
  occtWasmPath: string;
  occtInitTimeout: number;
  validateGeometryOutput: boolean;

  // Performance
  maxWorkerMemoryMB: number;
  enableMemoryMonitoring: boolean;
  meshCacheSizeMB: number;
  workerRestartThresholdMB: number;

  // Security
  enableCSP: boolean;
  requireCorsValidation: boolean;
  allowedOrigins: string[];

  // Logging
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  enableErrorReporting: boolean;
  sentryDSN?: string;
  enablePerformanceMonitoring: boolean;

  // Features
  enableExportValidation: boolean;
  enableHealthChecks: boolean;
  enableAdminDashboard: boolean;

  // Export
  maxExportSizeMB: number;
  supportedFormats: string[];
  requireExportValidation: boolean;
}

class EnvironmentManager {
  private config: EnvironmentConfig | null = null;

  /**
   * Parse and validate environment configuration
   */
  private parseConfig(): EnvironmentConfig {
    const mode = (process.env.BREPFLOW_MODE || process.env.NODE_ENV || 'development') as 'production' | 'development' | 'test';
    const isProduction = mode === 'production';
    const isDevelopment = mode === 'development';

    return {
      // Application
      mode,
      isProduction,
      isDevelopment,

      // Geometry Engine
      enableMockGeometry: this.parseBoolean(process.env.ENABLE_MOCK_GEOMETRY, isDevelopment),
      requireRealOCCT: this.parseBoolean(process.env.REQUIRE_REAL_OCCT, isProduction),
      occtWasmPath: process.env.OCCT_WASM_PATH || '/assets/wasm',
      occtInitTimeout: this.parseNumber(process.env.OCCT_INIT_TIMEOUT, 30000),
      validateGeometryOutput: this.parseBoolean(process.env.VALIDATE_GEOMETRY_OUTPUT, isProduction),

      // Performance
      maxWorkerMemoryMB: this.parseNumber(process.env.MAX_WORKER_MEMORY_MB, 2048),
      enableMemoryMonitoring: this.parseBoolean(process.env.ENABLE_MEMORY_MONITORING, true),
      meshCacheSizeMB: this.parseNumber(process.env.MESH_CACHE_SIZE_MB, 512),
      workerRestartThresholdMB: this.parseNumber(process.env.WORKER_RESTART_THRESHOLD_MB, 1800),

      // Security
      enableCSP: this.parseBoolean(process.env.ENABLE_CSP, isProduction),
      requireCorsValidation: this.parseBoolean(process.env.REQUIRE_CORS_VALIDATION, isProduction),
      allowedOrigins: this.parseStringArray(process.env.ALLOWED_ORIGINS, ['https://brepflow.com']),

      // Logging
      logLevel: (process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'error')) as 'error' | 'warn' | 'info' | 'debug',
      enableErrorReporting: this.parseBoolean(process.env.ENABLE_ERROR_REPORTING, isProduction),
      sentryDSN: process.env.SENTRY_DSN,
      enablePerformanceMonitoring: this.parseBoolean(process.env.ENABLE_PERFORMANCE_MONITORING, isProduction),

      // Features
      enableExportValidation: this.parseBoolean(process.env.ENABLE_EXPORT_VALIDATION, isProduction),
      enableHealthChecks: this.parseBoolean(process.env.ENABLE_HEALTH_CHECKS, true),
      enableAdminDashboard: this.parseBoolean(process.env.ENABLE_ADMIN_DASHBOARD, isDevelopment),

      // Export
      maxExportSizeMB: this.parseNumber(process.env.MAX_EXPORT_SIZE_MB, 100),
      supportedFormats: this.parseStringArray(process.env.SUPPORTED_FORMATS, ['step', 'iges', 'stl', 'obj']),
      requireExportValidation: this.parseBoolean(process.env.REQUIRE_EXPORT_VALIDATION, isProduction),
    };
  }

  /**
   * Parse boolean environment variable
   */
  private parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
  }

  /**
   * Parse number environment variable
   */
  private parseNumber(value: string | undefined, defaultValue: number): number {
    if (value === undefined) return defaultValue;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Parse comma-separated string array
   */
  private parseStringArray(value: string | undefined, defaultValue: string[]): string[] {
    if (!value) return defaultValue;
    return value.split(',').map(s => s.trim()).filter(Boolean);
  }

  /**
   * Get environment configuration
   */
  getConfig(): EnvironmentConfig {
    if (!this.config) {
      this.config = this.parseConfig();
      this.validateConfig(this.config);
    }
    return this.config;
  }

  /**
   * Validate configuration consistency
   */
  private validateConfig(config: EnvironmentConfig): void {
    // Production validations
    if (config.isProduction) {
      if (config.enableMockGeometry) {
        throw new Error('Production mode cannot use mock geometry');
      }
      if (!config.requireRealOCCT) {
        throw new Error('Production mode must require real OCCT');
      }
      if (!config.validateGeometryOutput) {
        console.warn('⚠️ Production mode should validate geometry output');
      }
    }

    // Development validations
    if (config.isDevelopment && config.requireRealOCCT && config.enableMockGeometry) {
      console.warn('⚠️ Both mock and real OCCT enabled, will prefer real OCCT');
    }

    // Memory validations
    if (config.workerRestartThresholdMB > config.maxWorkerMemoryMB) {
      throw new Error('Worker restart threshold cannot exceed max worker memory');
    }

    // Export validations
    if (config.requireExportValidation && !config.validateGeometryOutput) {
      throw new Error('Export validation requires geometry output validation');
    }
  }

  /**
   * Override configuration for testing
   */
  setTestConfig(overrides: Partial<EnvironmentConfig>): void {
    if (this.config?.mode !== 'test') {
      throw new Error('Can only override config in test mode');
    }
    this.config = { ...this.config!, ...overrides };
  }

  /**
   * Reset configuration (for testing)
   */
  reset(): void {
    this.config = null;
  }
}

// Singleton instance
export const Environment = new EnvironmentManager();

// Export convenience getters
export const getConfig = () => Environment.getConfig();
export const isProduction = () => Environment.getConfig().isProduction;
export const isDevelopment = () => Environment.getConfig().isDevelopment;
export const shouldUseMockGeometry = () => {
  const config = Environment.getConfig();
  return config.enableMockGeometry && !config.requireRealOCCT;
};