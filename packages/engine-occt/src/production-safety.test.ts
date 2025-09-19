import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  detectEnvironment,
  validateProductionSafety,
  createProductionSafeConfig,
  createProductionErrorBoundary,
  ProductionSafetyError,
  type EnvironmentConfig
} from './production-safety';

describe('Production Safety', () => {
  beforeEach(() => {
    vi.resetModules();
    // Reset any environment variable mocks
    delete process.env.NODE_ENV;
  });

  describe('Environment Detection', () => {
    it('should detect production environment', () => {
      process.env.NODE_ENV = 'production';
      const env = detectEnvironment();

      expect(env.isProduction).toBe(true);
      expect(env.allowMockGeometry).toBe(false);
      expect(env.nodeEnv).toBe('production');
    });

    it('should detect development environment', () => {
      process.env.NODE_ENV = 'development';
      const env = detectEnvironment();

      expect(env.isProduction).toBe(false);
      expect(env.isDevelopment).toBe(true);
      expect(env.allowMockGeometry).toBe(true);
    });

    it('should detect test environment', () => {
      process.env.NODE_ENV = 'test';
      const env = detectEnvironment();

      expect(env.isTest).toBe(true);
      expect(env.allowMockGeometry).toBe(true);
    });

    it('should default to development when NODE_ENV is undefined', () => {
      delete process.env.NODE_ENV;
      const env = detectEnvironment();

      expect(env.isDevelopment).toBe(true);
      expect(env.allowMockGeometry).toBe(true);
    });
  });

  describe('Production Safety Validation', () => {
    it('should throw error when mock geometry is used in production', () => {
      const productionEnv: EnvironmentConfig = {
        isProduction: true,
        isDevelopment: false,
        isTest: false,
        allowMockGeometry: false,
        nodeEnv: 'production'
      };

      expect(() => {
        validateProductionSafety(true, productionEnv);
      }).toThrow(ProductionSafetyError);

      expect(() => {
        validateProductionSafety(true, productionEnv);
      }).toThrow('Mock geometry detected in production environment');
    });

    it('should allow mock geometry in development', () => {
      const devEnv: EnvironmentConfig = {
        isProduction: false,
        isDevelopment: true,
        isTest: false,
        allowMockGeometry: true,
        nodeEnv: 'development'
      };

      expect(() => {
        validateProductionSafety(true, devEnv);
      }).not.toThrow();
    });

    it('should allow real geometry in production', () => {
      const productionEnv: EnvironmentConfig = {
        isProduction: true,
        isDevelopment: false,
        isTest: false,
        allowMockGeometry: false,
        nodeEnv: 'production'
      };

      expect(() => {
        validateProductionSafety(false, productionEnv);
      }).not.toThrow();
    });
  });

  describe('Production Safe Configuration', () => {
    it('should create production-safe config in production', () => {
      process.env.NODE_ENV = 'production';

      const config = createProductionSafeConfig();

      expect(config.enableRealOCCT).toBe(true);
      expect(config.fallbackToMock).toBe(false);
      expect(config.maxRetries).toBe(1);
      expect(config.operationTimeout).toBe(15000);
    });

    it('should create development config in development', () => {
      process.env.NODE_ENV = 'development';

      const config = createProductionSafeConfig();

      expect(config.enableRealOCCT).toBe(true);
      expect(config.fallbackToMock).toBe(true);
      expect(config.maxRetries).toBe(3);
      expect(config.operationTimeout).toBe(30000);
    });

    it('should reject unsafe production config', () => {
      process.env.NODE_ENV = 'production';

      expect(() => {
        createProductionSafeConfig({ fallbackToMock: true });
      }).toThrow(ProductionSafetyError);
    });

    it('should allow overrides in development', () => {
      process.env.NODE_ENV = 'development';

      const config = createProductionSafeConfig({
        fallbackToMock: false,
        maxRetries: 5
      });

      expect(config.fallbackToMock).toBe(false);
      expect(config.maxRetries).toBe(5);
    });
  });

  describe('Production Error Boundaries', () => {
    it('should create production-specific error in production', () => {
      const productionEnv: EnvironmentConfig = {
        isProduction: true,
        isDevelopment: false,
        isTest: false,
        allowMockGeometry: false,
        nodeEnv: 'production'
      };

      const error = createProductionErrorBoundary('TEST_OPERATION', productionEnv);

      expect(error).toBeInstanceOf(ProductionSafetyError);
      expect(error.message).toContain('Real OCCT geometry system failed');
      expect(error.message).toContain('mock fallback is disabled in production');
    });

    it('should create development error in development', () => {
      const devEnv: EnvironmentConfig = {
        isProduction: false,
        isDevelopment: true,
        isTest: false,
        allowMockGeometry: true,
        nodeEnv: 'development'
      };

      const error = createProductionErrorBoundary('TEST_OPERATION', devEnv);

      expect(error).toBeInstanceOf(Error);
      expect(error).not.toBeInstanceOf(ProductionSafetyError);
      expect(error.message).toContain('Mock geometry may be used in development');
    });
  });

  describe('ProductionSafetyError', () => {
    it('should create proper error with context', () => {
      const context = { test: 'data' };
      const error = new ProductionSafetyError('Test message', context);

      expect(error.name).toBe('ProductionSafetyError');
      expect(error.message).toBe('PRODUCTION SAFETY VIOLATION: Test message');
      expect(error.context).toEqual(context);
    });

    it('should work without context', () => {
      const error = new ProductionSafetyError('Test message');

      expect(error.name).toBe('ProductionSafetyError');
      expect(error.message).toBe('PRODUCTION SAFETY VIOLATION: Test message');
      expect(error.context).toBeUndefined();
    });
  });

  describe('Browser Environment Detection', () => {
    it('should handle browser environment without Node.js process', () => {
      // Mock browser environment
      const originalProcess = global.process;
      delete (global as any).process;

      // Mock window object
      Object.defineProperty(window, 'location', {
        value: { hostname: 'localhost' },
        writable: true
      });

      const env = detectEnvironment();

      expect(env.isDevelopment).toBe(true);
      expect(env.allowMockGeometry).toBe(true);

      // Restore
      global.process = originalProcess;
    });

    it('should detect production domain', () => {
      // Mock browser environment
      const originalProcess = global.process;
      delete (global as any).process;

      // Mock production domain
      Object.defineProperty(window, 'location', {
        value: { hostname: 'app.example.com' },
        writable: true
      });

      const env = detectEnvironment();

      expect(env.isProduction).toBe(true);
      expect(env.allowMockGeometry).toBe(false);

      // Restore
      global.process = originalProcess;
    });
  });
});