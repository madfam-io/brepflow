/**
 * Smoke Test Suite
 * Quick verification that the geometry test infrastructure works
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MockGeometry } from '@brepflow/engine-occt';
import { setupWASMTestEnvironment } from '../wasm-test-setup';

describe('Geometry Operations Smoke Test', () => {
  let geometryAPI: MockGeometry;
  let cleanup: () => void;

  beforeEach(() => {
    const { mockOCCT, cleanup: cleanupFn } = setupWASMTestEnvironment();
    cleanup = cleanupFn;
    geometryAPI = new MockGeometry(); // Use mock for tests
  });

  afterEach(() => {
    cleanup();
  });

  it('should initialize geometry API successfully', async () => {
    await geometryAPI.init();
    expect(geometryAPI).toBeDefined();
  });

  it('should create a simple box', async () => {
    await geometryAPI.init();

    const box = await geometryAPI.invoke('MAKE_BOX', {
      center: { x: 0, y: 0, z: 0 },
      width: 100,
      height: 50,
      depth: 25
    });

    expect(box).toBeDefined();
    expect(box.id).toBeDefined();
    expect(box.type).toBe('solid');
    expect(box.bbox).toBeDefined();
    expect(box.bbox.min.x).toBe(-50); // center - width/2
    expect(box.bbox.max.x).toBe(50);  // center + width/2
  });

  it('should handle sphere creation', async () => {
    await geometryAPI.init();

    const sphere = await geometryAPI.invoke('MAKE_SPHERE', {
      center: { x: 0, y: 0, z: 0 },
      radius: 25
    });

    expect(sphere).toBeDefined();
    expect(sphere.id).toBeDefined();
    expect(sphere.type).toBe('solid');
    expect(sphere.bbox).toBeDefined();
  });

  it('should handle tessellation', async () => {
    await geometryAPI.init();

    const box = await geometryAPI.invoke('MAKE_BOX', {
      center: { x: 0, y: 0, z: 0 },
      width: 50,
      height: 50,
      depth: 50
    });

    const mesh = await geometryAPI.tessellate(box, 0.1);

    expect(mesh).toBeDefined();
    expect(mesh.positions).toBeInstanceOf(Float32Array);
    expect(mesh.normals).toBeInstanceOf(Float32Array);
    expect(mesh.indices).toBeInstanceOf(Uint32Array);
    expect(mesh.positions.length).toBeGreaterThan(0);
  });
});