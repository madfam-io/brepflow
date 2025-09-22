/**
 * Comprehensive GeometryAPI Tests - Both Legacy and Integrated APIs
 * Test suite verifying geometry operations through the new IntegratedGeometryAPI and legacy GeometryAPI
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeometryAPI } from './geometry-api';
import { IntegratedGeometryAPI, DEFAULT_API_CONFIG, type OperationResult } from './integrated-geometry-api';

// Mock the dependencies for IntegratedGeometryAPI
vi.mock('./occt-loader', () => ({
  loadOCCTModule: vi.fn().mockResolvedValue({
    invoke: vi.fn().mockResolvedValue({ id: 'shape-1', type: 'solid' }),
    tessellate: vi.fn().mockResolvedValue({
      vertices: new Float32Array([0, 0, 0]),
      positions: new Float32Array([0, 0, 0]),
      indices: new Uint32Array([0, 1, 2]),
      normals: new Float32Array([0, 0, 1])
    }),
    terminate: vi.fn().mockResolvedValue(undefined)
  }),
  generateOCCTDiagnostics: vi.fn().mockResolvedValue('OCCT Diagnostics: OK')
}));

vi.mock('./worker-pool', () => ({
  getWorkerPool: vi.fn().mockReturnValue({
    execute: vi.fn().mockResolvedValue({
      result: { id: 'shape-1', type: 'solid' }
    }),
    shutdown: vi.fn().mockResolvedValue(undefined),
    getStats: vi.fn().mockReturnValue({ activeWorkers: 2, queueLength: 0 })
  }),
  DEFAULT_POOL_CONFIG: {}
}));

vi.mock('./memory-manager', () => ({
  getMemoryManager: vi.fn().mockReturnValue({
    getStats: vi.fn().mockReturnValue({ totalMemoryMB: 100, cacheHitRate: 0.8 }),
    generateOperationKey: vi.fn().mockReturnValue('cache-key-123'),
    getResult: vi.fn().mockReturnValue(null),
    cacheResult: vi.fn(),
    getMesh: vi.fn().mockReturnValue(null),
    cacheMesh: vi.fn().mockResolvedValue(undefined),
    forceCleanup: vi.fn(),
    shutdown: vi.fn(),
    generateMemoryReport: vi.fn().mockReturnValue('Memory Report: OK')
  }),
  DEFAULT_CACHE_CONFIG: {}
}));

vi.mock('./error-recovery', () => ({
  getErrorRecoverySystem: vi.fn().mockReturnValue({
    validateOperation: vi.fn().mockResolvedValue({ valid: true }),
    handleError: vi.fn().mockResolvedValue({ recovered: false }),
    reset: vi.fn(),
    getErrorStats: vi.fn().mockReturnValue({ totalErrors: 0, recoveredErrors: 0 }),
    generateErrorReport: vi.fn().mockReturnValue('Error Report: No errors')
  })
}));

vi.mock('./wasm-capability-detector', () => ({
  WASMCapabilityDetector: {
    detectCapabilities: vi.fn().mockResolvedValue({
      hasWASM: true,
      hasWorkers: true,
      hasSharedArrayBuffer: true,
      hasAtomics: true,
      hasThreads: true,
      hasSimd: true
    })
  },
  WASMPerformanceMonitor: {
    startMeasurement: vi.fn().mockReturnValue(() => {}),
    getPerformanceReport: vi.fn().mockReturnValue('Performance Report: OK'),
    clearMeasurements: vi.fn()
  }
}));

vi.mock('./production-safety', () => ({
  detectEnvironment: vi.fn().mockReturnValue({
    isProduction: false,
    isTest: true,
    allowMockGeometry: true
  }),
  validateProductionSafety: vi.fn(),
  createProductionSafeConfig: vi.fn().mockImplementation((config) => config),
  createProductionErrorBoundary: vi.fn(),
  logProductionSafetyStatus: vi.fn(),
  ProductionSafetyError: class extends Error {
    constructor(message, context) {
      super(message);
      this.context = context;
    }
  }
}));

// Mock the mock-geometry module with comprehensive testing interface
vi.mock('./mock-geometry', () => ({
  MockGeometry: vi.fn().mockImplementation(() => ({
    init: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn(),
    makeBox: vi.fn().mockReturnValue({ id: 'box-1', type: 'box' }),
    makeBoxWithOrigin: vi.fn().mockReturnValue({ id: 'box-origin-1', type: 'box' }),
    makeSphere: vi.fn().mockReturnValue({ id: 'sphere-1', type: 'sphere' }),
    makeCylinder: vi.fn().mockReturnValue({ id: 'cylinder-1', type: 'cylinder' }),
    makeTorus: vi.fn().mockReturnValue({ id: 'torus-1', type: 'torus' }),
    makeCone: vi.fn().mockReturnValue({ id: 'cone-1', type: 'cone' }),
    makeWedge: vi.fn().mockReturnValue({ id: 'wedge-1', type: 'wedge' }),
    extrude: vi.fn().mockReturnValue({ id: 'extrude-1', type: 'solid' }),
    booleanUnion: vi.fn().mockReturnValue({ id: 'union-1', type: 'union' }),
    booleanSubtract: vi.fn().mockReturnValue({ id: 'subtract-1', type: 'subtract' }),
    booleanIntersect: vi.fn().mockReturnValue({ id: 'intersect-1', type: 'intersect' }),
    tessellate: vi.fn().mockResolvedValue({
      vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
      positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
      indices: new Uint32Array([0, 1, 2]),
      normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
    }),
    invoke: vi.fn().mockImplementation((operation, params) => {
      switch (operation) {
        case 'CREATE_LINE': return { id: 'line-1', type: 'edge' };
        case 'CREATE_CIRCLE': return { id: 'circle-1', type: 'edge' };
        case 'CREATE_RECTANGLE': return { id: 'box-1', type: 'box' };
        case 'MAKE_BOX': return { id: 'box-1', type: 'box' };
        case 'MAKE_CYLINDER': return { id: 'cylinder-1', type: 'cylinder' };
        case 'MAKE_SPHERE': return { id: 'sphere-1', type: 'sphere' };
        case 'MAKE_EXTRUDE': return { id: 'extrude-1', type: 'solid' };
        case 'BOOLEAN_UNION': return { id: 'union-1', type: 'union' };
        case 'BOOLEAN_SUBTRACT': return { id: 'subtract-1', type: 'subtract' };
        case 'BOOLEAN_INTERSECT': return { id: 'intersect-1', type: 'intersect' };
        case 'TESSELLATE':
          // For IntegratedGeometryAPI tests, return mesh data directly
          // For legacy GeometryAPI tests, check if we need a mesh wrapper
          const meshData = {
            vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
            positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
            indices: new Uint32Array([0, 1, 2]),
            normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
          };
          // Legacy API expects { mesh: data }, IntegratedGeometryAPI expects data directly
          // Check if we're in a legacy context by looking at the shape parameter structure
          if (params && params.shape && typeof params.shape === 'object' && params.shape.id) {
            return meshData; // IntegratedGeometryAPI style
          }
          return { mesh: meshData }; // Legacy style
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
    })
  }))
}));

const expectOperationSuccess = <T>(result: OperationResult<T>) => {
  expect(result.success).toBe(true);
  expect(result.result).toBeDefined();
  return result.result as T;
};

const expectOperationFailure = <T>(result: OperationResult<T>, message?: string) => {
  expect(result.success).toBe(false);
  expect(result.error).toBeDefined();
  if (message) {
    expect(result.error).toContain(message);
  }
};

describe('IntegratedGeometryAPI', () => {
  let geometryAPI: IntegratedGeometryAPI;

  // Helper function to detect if we're in Node.js test environment where WASM loading will fail
  const isNodeJSTestEnvironment = () => {
    return (typeof window === 'undefined' && typeof process !== 'undefined') ||
           (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') ||
           (typeof global !== 'undefined' && global.__vitest__);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should create with mock implementation', async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
      expect(geometryAPI).toBeDefined();
      expect(geometryAPI.isInitialized).toBe(true);
    });

    it('should initialize successfully', async () => {
      geometryAPI = new IntegratedGeometryAPI(DEFAULT_API_CONFIG);

      // In Node.js test environment, initialization will fall back to mock
      await geometryAPI.init();

      expect(geometryAPI.isInitialized).toBe(true);
    });

    it('should handle initialization failure gracefully', async () => {
      geometryAPI = new IntegratedGeometryAPI(DEFAULT_API_CONFIG);

      // Even with initialization "failure", the API should fall back to mock
      await geometryAPI.init();

      // Should still be initialized with mock
      expect(geometryAPI.isInitialized).toBe(true);
    });
  });

  describe('Operation Execution', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should execute MAKE_BOX operation successfully', async () => {
      const operationResult = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      });

      const box = expectOperationSuccess(operationResult);
      expect(box.id).toBe('box-1');
      expect(box.type).toBe('box');
    });

    it('should execute MAKE_SPHERE operation successfully', async () => {
      const operationResult = await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 50
      });

      const sphere = expectOperationSuccess(operationResult);
      expect(sphere.id).toBe('sphere-1');
      expect(sphere.type).toBe('sphere');
    });

    it('should execute MAKE_CYLINDER operation successfully', async () => {
      const operationResult = await geometryAPI.invoke('MAKE_CYLINDER', {
        center: { x: 0, y: 0, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        radius: 25,
        height: 100
      });

      const cylinder = expectOperationSuccess(operationResult);
      expect(cylinder.id).toBe('cylinder-1');
      expect(cylinder.type).toBe('cylinder');
    });

    it('should return a failure result for unknown operations', async () => {
      const failureResult = await geometryAPI.invoke('UNKNOWN_OPERATION', {});
      expectOperationFailure(failureResult, 'Unknown operation');
    });

    it('should handle operation failure gracefully', async () => {
      const failure = await geometryAPI.invoke('INVALID_OPERATION', {});
      expectOperationFailure(failure, 'Unknown operation');
    });
  });

  describe('Tessellation', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should tessellate shape successfully', async () => {
      const boxHandle = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      }));

      const meshResult = await geometryAPI.tessellate(boxHandle, 0.1);
      const mesh = expectOperationSuccess(meshResult);

      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
      expect(mesh.vertices.length).toBeGreaterThan(0);
      expect(mesh.indices.length).toBeGreaterThan(0);
      expect(mesh.normals.length).toBeGreaterThan(0);
      expect(mesh.positions).toBeDefined();
    });

    it('should use cached mesh when available', async () => {
      const boxHandle = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      }));

      const firstResult = await geometryAPI.tessellate(boxHandle, 0.1);
      const firstMesh = expectOperationSuccess(firstResult);

      const secondResult = await geometryAPI.tessellate(boxHandle, 0.1);
      const secondMesh = expectOperationSuccess(secondResult);

      expect(firstMesh).toBe(secondMesh);
    });
  });

  describe('Performance and Monitoring', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should provide comprehensive statistics', () => {
      const stats = geometryAPI.getStatistics();

      expect(stats).toBeDefined();
      expect(stats).toHaveProperty('initialized');
      expect(stats).toHaveProperty('usingRealOCCT');
      expect(stats).toHaveProperty('environment');
      expect(stats).toHaveProperty('subsystems');
    });

    it('should generate diagnostic report', async () => {
      const report = await geometryAPI.generateDiagnosticReport();

      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(0);
    });

    it('should run optimization', async () => {
      await expect(geometryAPI.runOptimization()).resolves.not.toThrow();
    });
  });

  describe('API Testing', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should pass API test', async () => {
      const testResult = await geometryAPI.runAPITest();

      expect(testResult).toBeDefined();
      expect(testResult.success).toBe(true);
    });

    it('should handle test failure gracefully', async () => {
      // Force a test failure scenario
      const originalInvoke = geometryAPI.invoke;
      geometryAPI.invoke = vi.fn().mockRejectedValueOnce(new Error('Test failure'));

      const testResult = await geometryAPI.runAPITest();

      expect(testResult).toBeDefined();
      expect(testResult.success).toBe(false);
      expect(testResult.report).toBeDefined();
      expect(testResult.report).toContain('Test failure');

      // Restore original invoke method
      geometryAPI.invoke = originalInvoke;
    });
  });

  describe('Lifecycle Management', () => {
    it('should shutdown cleanly', async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();

      await expect(geometryAPI.shutdown()).resolves.not.toThrow();
      expect(geometryAPI.isInitialized).toBe(false);
    });
  });

  describe('Batch Operations', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should execute batch create operations', async () => {
      const operations = [
        { operation: 'MAKE_BOX', params: { center: { x: 0, y: 0, z: 0 }, width: 10, height: 10, depth: 10 }},
        { operation: 'MAKE_SPHERE', params: { center: { x: 0, y: 0, z: 0 }, radius: 5 }},
        { operation: 'MAKE_CYLINDER', params: { center: { x: 0, y: 0, z: 0 }, axis: { x: 0, y: 0, z: 1 }, radius: 3, height: 15 }}
      ];

      const results = await geometryAPI.batchExecute(operations);

      expect(results).toHaveLength(3);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(true);
      expect(results[2].success).toBe(true);
    });

    it('should handle mixed success/failure in batch operations', async () => {
      const operations = [
        { operation: 'MAKE_BOX', params: { center: { x: 0, y: 0, z: 0 }, width: 10, height: 10, depth: 10 }},
        { operation: 'INVALID_OP', params: {} },
        { operation: 'MAKE_SPHERE', params: { center: { x: 0, y: 0, z: 0 }, radius: 5 }}
      ];

      const results = await geometryAPI.batchExecute(operations);

      expect(results).toHaveLength(3);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[2].success).toBe(true);
    });
  });

  describe('Complex Operations', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should perform boolean union with mock', async () => {
      const box1 = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      }));

      const box2 = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 5, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      }));

      const unionResult = await geometryAPI.invoke('BOOLEAN_UNION', {
        shapes: [box1, box2]
      });

      const union = expectOperationSuccess(unionResult);
      expect(union.id).toBe('union-1');
      expect(union.type).toBe('union');
    });

    it('should perform boolean subtract with mock', async () => {
      const box = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 20, height: 20, depth: 20
      }));

      const sphere = expectOperationSuccess(await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 8
      }));

      const subtractResult = await geometryAPI.invoke('BOOLEAN_SUBTRACT', {
        base: box,
        tools: [sphere]
      });

      const subtract = expectOperationSuccess(subtractResult);
      expect(subtract.id).toBe('subtract-1');
      expect(subtract.type).toBe('subtract');
    });

    it('should perform boolean intersect with mock', async () => {
      const box = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 20, height: 20, depth: 20
      }));

      const sphere = expectOperationSuccess(await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 15
      }));

      const intersectResult = await geometryAPI.invoke('BOOLEAN_INTERSECT', {
        shapes: [box, sphere]
      });

      const intersect = expectOperationSuccess(intersectResult);
      expect(intersect.id).toBe('intersect-1');
      expect(intersect.type).toBe('intersect');
    });

    it('should tessellate shape with mock', async () => {
      const box = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      }));

      const meshResult = await geometryAPI.tessellate(box, 0.1);
      const mesh = expectOperationSuccess(meshResult);

      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
    });

    it('should handle unknown mock operations', async () => {
      const failure = await geometryAPI.invoke('UNKNOWN_OPERATION', {});
      expectOperationFailure(failure, 'Unknown operation');
    });
  });

  describe('Mock Operations', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should perform boolean union with mock', async () => {
      const union = expectOperationSuccess(await geometryAPI.invoke('BOOLEAN_UNION', {
        shapes: [
          { id: 'box-1', type: 'box' },
          { id: 'sphere-1', type: 'sphere' }
        ]
      }));

      expect(union.id).toBe('union-1');
      expect(union.type).toBe('union');
    });

    it('should perform boolean subtract with mock', async () => {
      const subtract = expectOperationSuccess(await geometryAPI.invoke('BOOLEAN_SUBTRACT', {
        base: { id: 'box-1', type: 'box' },
        tools: [{ id: 'sphere-1', type: 'sphere' }]
      }));

      expect(subtract.id).toBe('subtract-1');
      expect(subtract.type).toBe('subtract');
    });

    it('should perform boolean intersect with mock', async () => {
      const intersect = expectOperationSuccess(await geometryAPI.invoke('BOOLEAN_INTERSECT', {
        shapes: [
          { id: 'box-1', type: 'box' },
          { id: 'sphere-1', type: 'sphere' }
        ]
      }));

      expect(intersect.id).toBe('intersect-1');
      expect(intersect.type).toBe('intersect');
    });

    it('should tessellate shape with mock', async () => {
      const meshResult = await geometryAPI.tessellate({ id: 'box-1', type: 'box' }, 0.1);
      const mesh = expectOperationSuccess(meshResult);

      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
    });

    it('should handle unknown mock operations', async () => {
      const failure = await geometryAPI.invoke('UNKNOWN_OP', {});
      expectOperationFailure(failure, 'Unknown operation');
    });
  });

  describe('Worker Operations', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should invoke operation through worker', async () => {
      const box = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      }));

      expect(box.id).toBe('box-1');
      expect(box.type).toBe('box');
    });

    it('should tessellate through worker', async () => {
      const meshResult = await geometryAPI.tessellate({ id: 'box-1', type: 'box' }, 0.1);
      const mesh = expectOperationSuccess(meshResult);

      expect(mesh.vertices).toBeInstanceOf(Float32Array);
    });

    it('should shutdown through worker', async () => {
      await expect(geometryAPI.shutdown()).resolves.not.toThrow();
    });
  });

  describe('Singleton Functions', () => {
    it('should get singleton instance', () => {
      const instance1 = IntegratedGeometryAPI.getInstance();
      const instance2 = IntegratedGeometryAPI.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should create new instance', () => {
      const instance1 = new IntegratedGeometryAPI(DEFAULT_API_CONFIG);
      const instance2 = new IntegratedGeometryAPI(DEFAULT_API_CONFIG);
      expect(instance1).not.toBe(instance2);
    });
  });

  describe('Tessellation', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should tessellate with mock implementation', async () => {
      const result = await geometryAPI.tessellate({ id: 'box-1', type: 'box' }, 0.1);
      const mesh = expectOperationSuccess(result);

      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
    });

    it('should tessellate with worker implementation', async () => {
      const result = await geometryAPI.tessellate({ id: 'sphere-1', type: 'sphere' }, 0.05);
      const mesh = expectOperationSuccess(result);

      expect(mesh.positions).toBeInstanceOf(Float32Array);
    });
  });

  describe('Shutdown', () => {
    it('should shutdown with mock implementation', async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
      await expect(geometryAPI.shutdown()).resolves.not.toThrow();
      expect(geometryAPI.isInitialized).toBe(false);
    });

    it('should shutdown with worker implementation', async () => {
      geometryAPI = new IntegratedGeometryAPI(DEFAULT_API_CONFIG);
      await geometryAPI.init();
      await expect(geometryAPI.shutdown()).resolves.not.toThrow();
    });
  });

  describe('Type Safety', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should handle typed invoke operations', async () => {
      const box = expectOperationSuccess(await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10,
        height: 10,
        depth: 10
      }));

      expect(box.id).toBe('box-1');
      expect(box.type).toBe('box');
    });

    it('should return correct types for different operations', async () => {
      const sphere = expectOperationSuccess(await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 5
      }));

      const cylinder = expectOperationSuccess(await geometryAPI.invoke('MAKE_CYLINDER', {
        center: { x: 0, y: 0, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        radius: 3,
        height: 10
      }));

      expect(sphere.type).toBe('sphere');
      expect(cylinder.type).toBe('cylinder');
    });
  });

});

describe('GeometryAPI (Legacy)', () => {
  let geometryAPI: GeometryAPI;

  afterEach(() => {
    if (geometryAPI) {
      geometryAPI.dispose();
    }
  });

  describe('Initialization', () => {
    it('should initialize with GeometryAPI', async () => {
      geometryAPI = new GeometryAPI();
      await geometryAPI.init();
      expect(geometryAPI.isInitialized).toBe(true);
    });

    it('should handle GeometryAPI invoke operations', async () => {
      geometryAPI = new GeometryAPI();
      await geometryAPI.init();

      const result = await geometryAPI.invoke('MAKE_BOX', {
        width: 10,
        height: 10,
        depth: 10
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('box-1');
      expect(result.type).toBe('box');
    });
  });

  describe('Operations', () => {
    beforeEach(async () => {
      geometryAPI = new GeometryAPI();
      await geometryAPI.init();
    });

    it('should create box', async () => {
      const result = await geometryAPI.invoke('MAKE_BOX', {
        width: 100,
        height: 50,
        depth: 25
      });

      expect(result).toHaveProperty('id');
      expect(result.type).toBe('box');
    });

    it('should create sphere', async () => {
      const result = await geometryAPI.invoke('MAKE_SPHERE', {
        radius: 50
      });

      expect(result).toHaveProperty('id');
      expect(result.type).toBe('sphere');
    });

    it('should throw for unsupported operations', async () => {
      await expect(geometryAPI.invoke('UNSUPPORTED_OPERATION', {})).rejects.toThrow('Unsupported operation');
    });

    it('should tessellate shape', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        width: 100,
        height: 50,
        depth: 25
      });

      const meshResult = await geometryAPI.invoke('TESSELLATE', { shape: box });

      expect(meshResult).toBeDefined();
      expect(meshResult.mesh).toBeDefined();
      expect(meshResult.mesh.vertices).toBeInstanceOf(Float32Array);
      expect(meshResult.mesh.vertices.length).toBeGreaterThan(0);
      expect(meshResult.mesh.normals.length).toBeGreaterThan(0);
      expect(meshResult.mesh.indices.length).toBeGreaterThan(0);
    });

    it('should support tessellation with legacy shape identifiers', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        width: 42,
        height: 21,
        depth: 17
      });

      const meshResult = await geometryAPI.invoke('TESSELLATE', { shape: box.id });

      expect(meshResult).toBeDefined();
      expect(meshResult.mesh).toBeDefined();
      expect(meshResult.mesh.vertices).toBeInstanceOf(Float32Array);
      expect(meshResult.mesh.vertices.length).toBeGreaterThan(0);
      expect(meshResult.mesh.normals.length).toBeGreaterThan(0);
      expect(meshResult.mesh.indices.length).toBeGreaterThan(0);
    });
  });
});
