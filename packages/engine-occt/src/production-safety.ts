/**
 * Production Safety Utilities
 * Critical: Prevents mock geometry from being used in production environments
 */

export interface EnvironmentConfig {
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  allowMockGeometry: boolean;
  nodeEnv: string;
}

/**
 * Detect current environment and production safety requirements
 */
export function detectEnvironment(): EnvironmentConfig {
  // Check Node.js environment
  const nodeEnv = (typeof process !== 'undefined' && process.env?.NODE_ENV) || 'development';

  // Check browser environment indicators
  const hostname = typeof window !== 'undefined' ? window.location?.hostname : '';
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');

  // Production detection logic
  const isProduction = nodeEnv === 'production' ||
                      (!isLocalhost && hostname && !hostname.includes('dev') && !hostname.includes('staging'));

  const isDevelopment = nodeEnv === 'development' || isLocalhost;
  const isTest = nodeEnv === 'test' || (typeof global !== 'undefined' && global.__vitest__);

  // CRITICAL: Mock geometry is ONLY allowed in development/test
  const allowMockGeometry = !isProduction && (isDevelopment || isTest);

  return {
    isProduction,
    isDevelopment,
    isTest,
    allowMockGeometry,
    nodeEnv
  };
}

/**
 * Production Safety Error - thrown when mock geometry is attempted in production
 */
export class ProductionSafetyError extends Error {
  constructor(message: string, public context?: any) {
    super(`PRODUCTION SAFETY VIOLATION: ${message}`);
    this.name = 'ProductionSafetyError';
  }
}

/**
 * Validate that mock geometry is not being used in production
 */
export function validateProductionSafety(usingMockGeometry: boolean, environment?: EnvironmentConfig): void {
  const env = environment || detectEnvironment();

  if (usingMockGeometry && env.isProduction) {
    throw new ProductionSafetyError(
      'Mock geometry detected in production environment. This could lead to incorrect CAD operations and manufacturing errors.',
      {
        environment: env,
        timestamp: new Date().toISOString(),
        severity: 'CRITICAL'
      }
    );
  }

  if (usingMockGeometry && !env.allowMockGeometry) {
    throw new ProductionSafetyError(
      'Mock geometry is not allowed in this environment configuration.',
      {
        environment: env,
        timestamp: new Date().toISOString(),
        severity: 'HIGH'
      }
    );
  }
}

/**
 * Create production-safe configuration based on environment
 */
export function createProductionSafeConfig(overrides: any = {}): any {
  const env = detectEnvironment();

  // Base configuration - production safe by default
  const safeConfig = {
    enableRealOCCT: true,
    fallbackToMock: env.allowMockGeometry, // CRITICAL: Only allow in dev/test
    enablePerformanceMonitoring: true,
    enableMemoryManagement: true,
    enableErrorRecovery: true,
    maxRetries: env.isProduction ? 1 : 3, // Fewer retries in production for faster failure
    operationTimeout: env.isProduction ? 15000 : 30000, // Shorter timeout in production
    ...overrides
  };

  // CRITICAL: Only enable worker pool when real OCCT is possible
  // In test environments with mock geometry, disable worker pool to avoid WASM loading attempts
  if (env.isTest && safeConfig.fallbackToMock && !safeConfig.enableRealOCCT) {
    // Remove worker pool config to force direct mock execution
    delete safeConfig.workerPoolConfig;
  }

  // CRITICAL VALIDATION: Never allow mock fallback in production
  if (env.isProduction && safeConfig.fallbackToMock) {
    throw new ProductionSafetyError(
      'Configuration explicitly enables mock fallback in production environment. This is not allowed.',
      {
        environment: env,
        config: safeConfig,
        severity: 'CRITICAL'
      }
    );
  }

  return safeConfig;
}

/**
 * Production-safe error boundaries
 */
export function createProductionErrorBoundary(operation: string, env?: EnvironmentConfig): Error {
  const environment = env || detectEnvironment();

  if (environment.isProduction) {
    return new ProductionSafetyError(
      `Real OCCT geometry system failed and mock fallback is disabled in production. Operation: ${operation}`,
      {
        operation,
        environment,
        severity: 'CRITICAL',
        recommendation: 'Check WASM availability, browser compatibility, and OCCT module loading'
      }
    );
  } else {
    return new Error(`OCCT operation failed: ${operation}. Mock geometry may be used in development.`);
  }
}

/**
 * Log production safety status
 */
export function logProductionSafetyStatus(usingRealOCCT: boolean, environment?: EnvironmentConfig): void {
  const env = environment || detectEnvironment();

  const status = {
    environment: env.nodeEnv,
    isProduction: env.isProduction,
    usingRealOCCT,
    usingMockGeometry: !usingRealOCCT,
    allowMockGeometry: env.allowMockGeometry,
    timestamp: new Date().toISOString()
  };

  if (env.isProduction) {
    if (usingRealOCCT) {
      console.log('✅ PRODUCTION SAFE: Using real OCCT geometry operations', status);
    } else {
      console.error('🚨 PRODUCTION SAFETY VIOLATION: Not using real OCCT geometry', status);
      throw new ProductionSafetyError('Production geometry validation failed', status);
    }
  } else {
    console.log(`🛠️ ${env.isTest ? 'TEST' : 'DEVELOPMENT'} MODE: Geometry system status`, status);
  }
}