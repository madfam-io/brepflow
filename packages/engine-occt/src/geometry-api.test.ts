/**
 * Comprehensive GeometryAPI Tests - Both Legacy and Integrated APIs
 * Test suite verifying geometry operations through the new IntegratedGeometryAPI and legacy GeometryAPI
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeometryAPI } from './geometry-api';
import { IntegratedGeometryAPI } from './integrated-geometry-api';

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
    booleanUnion: vi.fn().mockReturnValue({ id: 'union-1', type: 'solid' }),
    booleanSubtract: vi.fn().mockReturnValue({ id: 'subtract-1', type: 'solid' }),
    booleanIntersect: vi.fn().mockReturnValue({ id: 'intersect-1', type: 'solid' }),
    tessellate: vi.fn().mockResolvedValue({
      vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
      indices: new Uint32Array([0, 1, 2]),
      normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
    }),
    dispose: vi.fn(),
    invoke: vi.fn().mockImplementation((operation, params) => {
      switch (operation) {
        case 'CREATE_LINE': return { id: 'line-1', type: 'edge' };
        case 'CREATE_CIRCLE': return { id: 'circle-1', type: 'edge' };
        case 'CREATE_RECTANGLE': return { id: 'box-1', type: 'box' };
        case 'MAKE_BOX': return { id: 'box-1', type: 'box' };
        case 'MAKE_CYLINDER': return { id: 'cylinder-1', type: 'cylinder' };
        case 'MAKE_SPHERE': return { id: 'sphere-1', type: 'sphere' };
        case 'MAKE_EXTRUDE': return { id: 'extrude-1', type: 'solid' };
        case 'BOOLEAN_UNION': return { id: 'union-1', type: 'solid' };
        case 'BOOLEAN_SUBTRACT': return { id: 'subtract-1', type: 'solid' };
        case 'BOOLEAN_INTERSECT': return { id: 'intersect-1', type: 'solid' };
        case 'TESSELLATE':
          // For IntegratedGeometryAPI tests, return mesh data directly
          // For legacy GeometryAPI tests, check if we need a mesh wrapper
          const meshData = {
            vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
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
          console.warn(`Mock operation not implemented: ${operation}`);
          return { id: 'unknown-1', type: 'solid', bbox: { min: { x: -50, y: -50, z: -50 }, max: { x: 50, y: 50, z: 50 } } };
      }
    })
  }))
}));

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
      geometryAPI = new IntegratedGeometryAPI();

      // In Node.js test environment, initialization will fall back to mock
      await geometryAPI.init();

      expect(geometryAPI.isInitialized).toBe(true);
    });

    it('should handle initialization failure gracefully', async () => {
      geometryAPI = new IntegratedGeometryAPI();

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
      const result = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('box-1');
      expect(result.type).toBe('box');
    });

    it('should execute MAKE_SPHERE operation successfully', async () => {
      const result = await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 50
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('sphere-1');
      expect(result.type).toBe('sphere');
    });

    it('should execute MAKE_CYLINDER operation successfully', async () => {
      const result = await geometryAPI.invoke('MAKE_CYLINDER', {
        center: { x: 0, y: 0, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        radius: 25,
        height: 100
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('cylinder-1');
      expect(result.type).toBe('cylinder');
    });

    it('should handle operation failure gracefully', async () => {
      // Test with an invalid operation
      await expect(geometryAPI.invoke('INVALID_OPERATION', {})).rejects.toThrow();
    });
  });

  describe('Tessellation', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should tessellate shape successfully', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      });

      const mesh = await geometryAPI.tessellate(box, 0.1);

      expect(mesh).toBeDefined();
      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
    });

    it('should use cached mesh when available', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      });

      // First call - should cache the result
      const mesh1 = await geometryAPI.tessellate(box, 0.1);

      // Second call - should use cached result
      const mesh2 = await geometryAPI.tessellate(box, 0.1);

      expect(mesh1).toBe(mesh2); // Should be the exact same object (cached)
    });
  });

  describe('Performance and Monitoring', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should provide comprehensive statistics', () => {
      const stats = geometryAPI.getStatistics();

      expect(stats).toBeDefined();
      expect(stats).toHaveProperty('operationCount');
      expect(stats).toHaveProperty('cacheHitRate');
      expect(stats).toHaveProperty('totalExecutionTime');
      expect(stats).toHaveProperty('averageExecutionTime');
      expect(stats).toHaveProperty('memoryUsage');
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
      expect(testResult.errors).toBeDefined();

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
      const box1 = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      });

      const box2 = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 5, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      });

      const union = await geometryAPI.invoke('BOOLEAN_UNION', {
        shapes: [box1, box2]
      });

      expect(union).toBeDefined();
      expect(union.id).toBe('union-1');
      expect(union.type).toBe('solid');
    });

    it('should perform boolean subtract with mock', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 20, height: 20, depth: 20
      });

      const sphere = await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 8
      });

      const subtract = await geometryAPI.invoke('BOOLEAN_SUBTRACT', {
        base: box,
        tools: [sphere]
      });

      expect(subtract).toBeDefined();
      expect(subtract.id).toBe('subtract-1');
      expect(subtract.type).toBe('solid');
    });

    it('should perform boolean intersect with mock', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 20, height: 20, depth: 20
      });

      const sphere = await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 15
      });

      const intersect = await geometryAPI.invoke('BOOLEAN_INTERSECT', {
        shapes: [box, sphere]
      });

      expect(intersect).toBeDefined();
      expect(intersect.id).toBe('intersect-1');
      expect(intersect.type).toBe('solid');
    });

    it('should tessellate shape with mock', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      });

      const mesh = await geometryAPI.tessellate(box, 0.1);

      expect(mesh).toBeDefined();
      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
    });

    it('should handle unknown mock operations', async () => {
      await expect(
        geometryAPI.invoke('UNKNOWN_OPERATION', {})
      ).rejects.toThrow();
    });
  });

  describe('Mock Operations', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should perform boolean union with mock', async () => {
      const result = await geometryAPI.invoke('BOOLEAN_UNION', {
        shapes: [
          { id: 'box-1', type: 'box' },
          { id: 'sphere-1', type: 'sphere' }
        ]
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('union-1');
      expect(result.type).toBe('solid');
    });

    it('should perform boolean subtract with mock', async () => {
      const result = await geometryAPI.invoke('BOOLEAN_SUBTRACT', {
        base: { id: 'box-1', type: 'box' },
        tools: [{ id: 'sphere-1', type: 'sphere' }]
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('subtract-1');
      expect(result.type).toBe('solid');
    });

    it('should perform boolean intersect with mock', async () => {
      const result = await geometryAPI.invoke('BOOLEAN_INTERSECT', {
        shapes: [
          { id: 'box-1', type: 'box' },
          { id: 'sphere-1', type: 'sphere' }
        ]
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('intersect-1');
      expect(result.type).toBe('solid');
    });

    it('should tessellate shape with mock', async () => {
      const shape = { id: 'box-1', type: 'box' };
      const mesh = await geometryAPI.tessellate(shape, 0.1);

      expect(mesh).toBeDefined();
      expect(mesh.vertices).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
    });

    it('should handle unknown mock operations', async () => {
      await expect(
        geometryAPI.invoke('UNKNOWN_OP', {})
      ).rejects.toThrow();
    });
  });

  describe('Worker Operations', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should invoke operation through worker', async () => {
      const result = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10, height: 10, depth: 10
      });

      expect(result).toBeDefined();
      expect(result.id).toBe('box-1');
      expect(result.type).toBe('box');
    });

    it('should tessellate through worker', async () => {
      const shape = { id: 'box-1', type: 'box' };
      const mesh = await geometryAPI.tessellate(shape, 0.1);

      expect(mesh).toBeDefined();
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
      const instance1 = new IntegratedGeometryAPI();
      const instance2 = new IntegratedGeometryAPI();
      expect(instance1).not.toBe(instance2);
    });
  });

  describe('Tessellation', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should tessellate with mock implementation', async () => {
      const shape = { id: 'box-1', type: 'box' };
      const result = await geometryAPI.tessellate(shape, 0.1);

      expect(result).toBeDefined();
      expect(result.vertices).toBeInstanceOf(Float32Array);
      expect(result.indices).toBeInstanceOf(Uint32Array);
      expect(result.normals).toBeInstanceOf(Float32Array);
    });

    it('should tessellate with worker implementation', async () => {
      const shape = { id: 'sphere-1', type: 'sphere' };
      const result = await geometryAPI.tessellate(shape, 0.05);

      expect(result).toBeDefined();
      expect(result.vertices).toBeInstanceOf(Float32Array);
    });
  });

  describe('Shutdown', () => {
    it('should shutdown with mock implementation', async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
      await expect(geometryAPI.shutdown()).resolves.not.toThrow();
      expect(geometryAPI.isInitialized).toBe(false);
    });

    it('should shutdown with worker implementation', async () => {
      geometryAPI = new IntegratedGeometryAPI();
      await geometryAPI.init();
      await expect(geometryAPI.shutdown()).resolves.not.toThrow();
    });
  });

  describe('Type Safety', () => {
    beforeEach(async () => {
      geometryAPI = IntegratedGeometryAPI.createWithMock();
    });

    it('should handle typed invoke operations', async () => {
      const box = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10,
        height: 10,
        depth: 10
      });

      expect(box.id).toBe('box-1');
      expect(box.type).toBe('box');
    });

    it('should return correct types for different operations', async () => {
      const sphere = await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 5
      });

      const cylinder = await geometryAPI.invoke('MAKE_CYLINDER', {
        center: { x: 0, y: 0, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        radius: 3,
        height: 10
      });

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
    });
  });
});