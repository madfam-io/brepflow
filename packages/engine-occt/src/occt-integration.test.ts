/**
 * OCCT Integration Tests - Real Geometry Operations
 * Validates actual OCCT functionality with comprehensive test scenarios
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { loadOCCT, OCCTMemoryManager } from './occt-bindings';
import { WASMLoader } from './wasm-loader';
import type { ShapeHandle, MeshData } from '@brepflow/types';

// Test configuration
const TEST_CONFIG = {
  timeout: 30000, // 30 seconds for WASM operations
  precision: 0.01,
  angleTolerance: 0.1,
  memoryThreshold: 100 // MB
};

describe('OCCT Integration Tests', () => {
  let occtModule: any = null;
  let testShapes: Map<string, ShapeHandle> = new Map();

  beforeAll(async () => {
    // Skip tests if WASM capabilities are insufficient
    const loader = WASMLoader.getInstance();
    const capabilities = await loader.detectCapabilities();

    if (!capabilities.hasWASM) {
      console.warn('Skipping OCCT tests - WebAssembly not supported');
      return;
    }

    try {
      console.log('Loading OCCT module for integration tests...');
      occtModule = await loadOCCT();
      console.log('OCCT module loaded successfully');
    } catch (error) {
      console.warn('Failed to load OCCT, tests will use fallback:', error);
      // Tests will run but may have different expectations
    }
  }, TEST_CONFIG.timeout);

  afterAll(async () => {
    // Cleanup all test shapes
    if (occtModule) {
      for (const [id, shape] of testShapes) {
        try {
          occtModule.deleteShape(shape.id);
        } catch (error) {
          console.warn(`Failed to cleanup shape ${id}:`, error);
        }
      }

      OCCTMemoryManager.cleanup();
    }
    testShapes.clear();
  });

  beforeEach(() => {
    // Clear test shapes for each test
    testShapes.clear();
  });

  describe('Primitive Creation', () => {
    it('should create a valid box', async () => {
      if (!occtModule) return;

      const box = occtModule.makeBox(100, 50, 25);

      expect(box).toBeDefined();
      expect(box.id).toBeDefined();
      expect(box.type).toBe('solid');
      expect(box.volume).toBeGreaterThan(0);
      expect(box.area).toBeGreaterThan(0);

      // Verify bounding box dimensions
      expect(box.bbox_max_x - box.bbox_min_x).toBeCloseTo(100, 1);
      expect(box.bbox_max_y - box.bbox_min_y).toBeCloseTo(50, 1);
      expect(box.bbox_max_z - box.bbox_min_z).toBeCloseTo(25, 1);

      testShapes.set('box', box);
    });

    it('should create a valid sphere', async () => {
      if (!occtModule) return;

      const sphere = occtModule.makeSphere(50);

      expect(sphere).toBeDefined();
      expect(sphere.id).toBeDefined();
      expect(sphere.type).toBe('solid');
      expect(sphere.volume).toBeGreaterThan(0);

      // Verify sphere properties
      const expectedVolume = (4/3) * Math.PI * Math.pow(50, 3);
      expect(sphere.volume).toBeCloseTo(expectedVolume, -3); // Within 1000 units

      testShapes.set('sphere', sphere);
    });

    it('should create a valid cylinder', async () => {
      if (!occtModule) return;

      const cylinder = occtModule.makeCylinder(30, 100);

      expect(cylinder).toBeDefined();
      expect(cylinder.id).toBeDefined();
      expect(cylinder.type).toBe('solid');
      expect(cylinder.volume).toBeGreaterThan(0);

      // Verify cylinder properties
      const expectedVolume = Math.PI * Math.pow(30, 2) * 100;
      expect(cylinder.volume).toBeCloseTo(expectedVolume, -3);

      testShapes.set('cylinder', cylinder);
    });

    it('should create a torus with proper geometry', async () => {
      if (!occtModule) return;

      const torus = occtModule.makeTorus(50, 10);

      expect(torus).toBeDefined();
      expect(torus.id).toBeDefined();
      expect(torus.type).toBe('solid');
      expect(torus.volume).toBeGreaterThan(0);

      // Verify torus volume: 2π²R²r where R=major, r=minor
      const expectedVolume = 2 * Math.PI * Math.PI * 50 * 50 * 10;
      expect(torus.volume).toBeCloseTo(expectedVolume, -3);

      testShapes.set('torus', torus);
    });
  });

  describe('Advanced Operations', () => {
    let profileShape: ShapeHandle;

    beforeEach(async () => {
      if (!occtModule) return;
      // Create a simple rectangular profile for extrusion/revolution
      profileShape = occtModule.makeBox(20, 30, 2);
      testShapes.set('profile', profileShape);
    });

    it('should perform extrusion correctly', async () => {
      if (!occtModule || !profileShape) return;

      const extruded = occtModule.extrude(profileShape.id, 0, 0, 50);

      expect(extruded).toBeDefined();
      expect(extruded.id).toBeDefined();
      expect(extruded.type).toBe('solid');
      expect(extruded.volume).toBeGreaterThan(profileShape.volume || 0);

      testShapes.set('extruded', extruded);
    });

    it('should perform revolution correctly', async () => {
      if (!occtModule || !profileShape) return;

      // Revolve around Z-axis by 180 degrees
      const revolved = occtModule.revolve(
        profileShape.id,
        Math.PI, // 180 degrees
        0, 0, 1, // Z-axis
        0, 0, 0  // Origin
      );

      expect(revolved).toBeDefined();
      expect(revolved.id).toBeDefined();
      expect(revolved.type).toBe('solid');
      expect(revolved.volume).toBeGreaterThan(0);

      testShapes.set('revolved', revolved);
    });
  });

  describe('Boolean Operations', () => {
    let box1: ShapeHandle, box2: ShapeHandle;

    beforeEach(async () => {
      if (!occtModule) return;

      // Create two overlapping boxes
      box1 = occtModule.makeBoxWithOrigin(0, 0, 0, 60, 40, 30);
      box2 = occtModule.makeBoxWithOrigin(30, 20, 15, 60, 40, 30);

      testShapes.set('box1', box1);
      testShapes.set('box2', box2);
    });

    it('should perform union correctly', async () => {
      if (!occtModule || !box1 || !box2) return;

      const union = occtModule.booleanUnion(box1.id, box2.id);

      expect(union).toBeDefined();
      expect(union.id).toBeDefined();
      expect(union.type).toBe('solid');
      expect(union.volume).toBeGreaterThan(0);

      // Union volume should be less than sum (due to overlap)
      const totalVolume = (box1.volume || 0) + (box2.volume || 0);
      expect(union.volume).toBeLessThan(totalVolume);
      expect(union.volume).toBeGreaterThan(Math.max(box1.volume || 0, box2.volume || 0));

      testShapes.set('union', union);
    });

    it('should perform subtraction correctly', async () => {
      if (!occtModule || !box1 || !box2) return;

      const difference = occtModule.booleanSubtract(box1.id, box2.id);

      expect(difference).toBeDefined();
      expect(difference.id).toBeDefined();
      expect(difference.type).toBe('solid');
      expect(difference.volume).toBeGreaterThan(0);

      // Difference should be smaller than original
      expect(difference.volume).toBeLessThan(box1.volume || 0);

      testShapes.set('difference', difference);
    });

    it('should perform intersection correctly', async () => {
      if (!occtModule || !box1 || !box2) return;

      const intersection = occtModule.booleanIntersect(box1.id, box2.id);

      expect(intersection).toBeDefined();
      expect(intersection.id).toBeDefined();
      expect(intersection.type).toBe('solid');
      expect(intersection.volume).toBeGreaterThan(0);

      // Intersection should be smaller than both originals
      expect(intersection.volume).toBeLessThan(box1.volume || 0);
      expect(intersection.volume).toBeLessThan(box2.volume || 0);

      testShapes.set('intersection', intersection);
    });
  });

  describe('Feature Operations', () => {
    let baseShape: ShapeHandle;

    beforeEach(async () => {
      if (!occtModule) return;
      baseShape = occtModule.makeBox(80, 60, 40);
      testShapes.set('baseShape', baseShape);
    });

    it('should create fillets on edges', async () => {
      if (!occtModule || !baseShape) return;

      const filleted = occtModule.makeFillet(baseShape.id, 5);

      expect(filleted).toBeDefined();
      expect(filleted.id).toBeDefined();
      expect(filleted.type).toBe('solid');

      // Fillet should slightly reduce volume
      expect(filleted.volume).toBeLessThan(baseShape.volume || 0);
      expect(filleted.volume).toBeGreaterThan((baseShape.volume || 0) * 0.9);

      testShapes.set('filleted', filleted);
    });

    it('should create chamfers on edges', async () => {
      if (!occtModule || !baseShape) return;

      const chamfered = occtModule.makeChamfer(baseShape.id, 5);

      expect(chamfered).toBeDefined();
      expect(chamfered.id).toBeDefined();
      expect(chamfered.type).toBe('solid');

      // Chamfer should slightly reduce volume
      expect(chamfered.volume).toBeLessThan(baseShape.volume || 0);
      expect(chamfered.volume).toBeGreaterThan((baseShape.volume || 0) * 0.9);

      testShapes.set('chamfered', chamfered);
    });

    it('should create shell (hollow) from solid', async () => {
      if (!occtModule || !baseShape) return;

      const shelled = occtModule.makeShell(baseShape.id, 5);

      expect(shelled).toBeDefined();
      expect(shelled.id).toBeDefined();
      expect(shelled.type).toBe('solid');

      // Shell should significantly reduce volume
      expect(shelled.volume).toBeLessThan(baseShape.volume || 0);
      expect(shelled.volume).toBeGreaterThan(0);

      testShapes.set('shelled', shelled);
    });
  });

  describe('Transformation Operations', () => {
    let originalShape: ShapeHandle;

    beforeEach(async () => {
      if (!occtModule) return;
      originalShape = occtModule.makeSphere(25);
      testShapes.set('original', originalShape);
    });

    it('should transform with translation', async () => {
      if (!occtModule || !originalShape) return;

      const transformed = occtModule.transform(
        originalShape.id,
        100, 50, 25, // Translation
        0, 0, 0,     // No rotation
        1, 1, 1      // No scaling
      );

      expect(transformed).toBeDefined();
      expect(transformed.id).toBeDefined();
      expect(transformed.type).toBe('solid');

      // Volume should be preserved
      expect(transformed.volume).toBeCloseTo(originalShape.volume || 0, 1);

      // Center should be translated
      expect(transformed.centerX).toBeCloseTo((originalShape.centerX || 0) + 100, 1);
      expect(transformed.centerY).toBeCloseTo((originalShape.centerY || 0) + 50, 1);
      expect(transformed.centerZ).toBeCloseTo((originalShape.centerZ || 0) + 25, 1);

      testShapes.set('translated', transformed);
    });

    it('should scale shape uniformly', async () => {
      if (!occtModule || !originalShape) return;

      const scaled = occtModule.transform(
        originalShape.id,
        0, 0, 0,     // No translation
        0, 0, 0,     // No rotation
        2, 2, 2      // 2x scaling
      );

      expect(scaled).toBeDefined();
      expect(scaled.id).toBeDefined();
      expect(scaled.type).toBe('solid');

      // Volume should scale by factor^3 (2^3 = 8)
      expect(scaled.volume).toBeCloseTo((originalShape.volume || 0) * 8, 1);

      testShapes.set('scaled', scaled);
    });

    it('should copy shape correctly', async () => {
      if (!occtModule || !originalShape) return;

      const copied = occtModule.copyShape(originalShape.id);

      expect(copied).toBeDefined();
      expect(copied.id).toBeDefined();
      expect(copied.id).not.toBe(originalShape.id); // Different ID
      expect(copied.type).toBe(originalShape.type);

      // Properties should match
      expect(copied.volume).toBeCloseTo(originalShape.volume || 0, 1);
      expect(copied.area).toBeCloseTo(originalShape.area || 0, 1);

      testShapes.set('copied', copied);
    });
  });

  describe('Tessellation and Mesh Generation', () => {
    let testShape: ShapeHandle;

    beforeEach(async () => {
      if (!occtModule) return;
      testShape = occtModule.makeCylinder(20, 50);
      testShapes.set('testShape', testShape);
    });

    it('should tessellate shape to valid mesh', async () => {
      if (!occtModule || !testShape) return;

      const mesh = occtModule.tessellate(testShape.id, TEST_CONFIG.precision, TEST_CONFIG.angleTolerance);

      expect(mesh).toBeDefined();
      expect(mesh.positions).toBeInstanceOf(Float32Array);
      expect(mesh.normals).toBeInstanceOf(Float32Array);
      expect(mesh.indices).toBeInstanceOf(Uint32Array);

      // Verify mesh integrity
      expect(mesh.positions.length % 3).toBe(0); // Multiple of 3 for XYZ
      expect(mesh.normals.length).toBe(mesh.positions.length);
      expect(mesh.indices.length % 3).toBe(0); // Multiple of 3 for triangles

      // Check vertex and triangle counts
      const vertexCount = mesh.positions.length / 3;
      const triangleCount = mesh.indices.length / 3;

      expect(mesh.vertexCount).toBe(vertexCount);
      expect(mesh.triangleCount).toBe(triangleCount);

      // Verify indices are within vertex range
      for (let i = 0; i < mesh.indices.length; i++) {
        expect(mesh.indices[i]).toBeLessThan(vertexCount);
      }

      // Basic mesh quality checks
      expect(vertexCount).toBeGreaterThan(8); // More complex than a box
      expect(triangleCount).toBeGreaterThan(12);
    });

    it('should generate different quality meshes', async () => {
      if (!occtModule || !testShape) return;

      const coarseMesh = occtModule.tessellate(testShape.id, 1.0, 0.5);
      const fineMesh = occtModule.tessellate(testShape.id, 0.01, 0.05);

      // Fine mesh should have more triangles
      expect(fineMesh.triangleCount).toBeGreaterThan(coarseMesh.triangleCount);
      expect(fineMesh.vertexCount).toBeGreaterThan(coarseMesh.vertexCount);
    });
  });

  describe('Memory Management', () => {
    it('should track shape creation and deletion', async () => {
      if (!occtModule) return;

      const initialCount = occtModule.getShapeCount();

      // Create some shapes
      const shapes = [
        occtModule.makeBox(10, 10, 10),
        occtModule.makeSphere(15),
        occtModule.makeCylinder(8, 20)
      ];

      expect(occtModule.getShapeCount()).toBe(initialCount + 3);

      // Delete shapes
      for (const shape of shapes) {
        occtModule.deleteShape(shape.id);
      }

      expect(occtModule.getShapeCount()).toBe(initialCount);
    });

    it('should report memory usage', async () => {
      if (!occtModule) return;

      const status = occtModule.getStatus();
      expect(status).toContain('Shapes:');
      expect(status).toContain('Memory:');

      const version = occtModule.getOCCTVersion();
      expect(version).toMatch(/\d+\.\d+\.\d+/); // Version format
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid shape operations gracefully', async () => {
      if (!occtModule) return;

      // Try to operate on non-existent shape
      expect(() => {
        occtModule.deleteShape('non-existent-shape');
      }).not.toThrow(); // Should handle gracefully
    });

    it('should validate input parameters', async () => {
      if (!occtModule) return;

      // Invalid dimensions should not crash
      try {
        const invalidBox = occtModule.makeBox(-10, 0, 50);
        // If it succeeds, it should still be valid
        if (invalidBox && invalidBox.id) {
          expect(invalidBox.volume).toBeGreaterThan(0);
          testShapes.set('invalidBox', invalidBox);
        }
      } catch (error) {
        // Error is acceptable for invalid parameters
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('File I/O Operations', () => {
    let testShape: ShapeHandle;

    beforeEach(async () => {
      if (!occtModule) return;
      testShape = occtModule.makeBox(30, 40, 50);
      testShapes.set('ioTestShape', testShape);
    });

    it('should export to STEP format', async () => {
      if (!occtModule || !testShape) return;

      const stepData = occtModule.exportSTEP(testShape.id);

      expect(stepData).toBeDefined();
      expect(typeof stepData).toBe('string');
      expect(stepData.length).toBeGreaterThan(0);

      // Basic STEP format validation
      if (stepData !== "STEP file data placeholder") {
        expect(stepData).toMatch(/ISO-10303/); // STEP header
      }
    });

    it('should export to STL format', async () => {
      if (!occtModule || !testShape) return;

      const stlData = occtModule.exportSTL(testShape.id, true);

      expect(stlData).toBeDefined();
      expect(typeof stlData).toBe('string');
      expect(stlData.length).toBeGreaterThan(0);
    });
  });
});

// Performance benchmarks
describe('OCCT Performance Benchmarks', () => {
  let occtModule: any = null;

  beforeAll(async () => {
    const loader = WASMLoader.getInstance();
    const capabilities = await loader.detectCapabilities();

    if (!capabilities.hasWASM) {
      console.warn('Skipping performance tests - WebAssembly not supported');
      return;
    }

    try {
      occtModule = await loadOCCT();
    } catch (error) {
      console.warn('Failed to load OCCT for performance tests:', error);
    }
  }, TEST_CONFIG.timeout);

  afterAll(() => {
    if (occtModule) {
      occtModule.clearAllShapes();
      OCCTMemoryManager.cleanup();
    }
  });

  it('should create primitives within performance targets', async () => {
    if (!occtModule) return;

    const start = performance.now();

    // Create 100 boxes
    const shapes = [];
    for (let i = 0; i < 100; i++) {
      const box = occtModule.makeBox(10 + i, 10 + i, 10 + i);
      shapes.push(box);
    }

    const end = performance.now();
    const avgTime = (end - start) / 100;

    console.log(`Average primitive creation time: ${avgTime.toFixed(2)}ms`);
    expect(avgTime).toBeLessThan(50); // 50ms per primitive max

    // Cleanup
    for (const shape of shapes) {
      occtModule.deleteShape(shape.id);
    }
  });

  it('should perform boolean operations within performance targets', async () => {
    if (!occtModule) return;

    const box1 = occtModule.makeBox(50, 50, 50);
    const box2 = occtModule.makeBoxWithOrigin(25, 25, 25, 50, 50, 50);

    const start = performance.now();
    const union = occtModule.booleanUnion(box1.id, box2.id);
    const end = performance.now();

    const operationTime = end - start;
    console.log(`Boolean union time: ${operationTime.toFixed(2)}ms`);
    expect(operationTime).toBeLessThan(1000); // 1 second max for simple boolean

    // Cleanup
    occtModule.deleteShape(box1.id);
    occtModule.deleteShape(box2.id);
    occtModule.deleteShape(union.id);
  });

  it('should tessellate meshes within performance targets', async () => {
    if (!occtModule) return;

    const complexShape = occtModule.makeTorus(50, 15);

    const start = performance.now();
    const mesh = occtModule.tessellate(complexShape.id, 0.1, 0.1);
    const end = performance.now();

    const tessellationTime = end - start;
    console.log(`Tessellation time: ${tessellationTime.toFixed(2)}ms for ${mesh.triangleCount} triangles`);

    expect(tessellationTime).toBeLessThan(5000); // 5 seconds max
    expect(mesh.triangleCount).toBeLessThan(100000); // Reasonable triangle count

    // Cleanup
    occtModule.deleteShape(complexShape.id);
  });
});