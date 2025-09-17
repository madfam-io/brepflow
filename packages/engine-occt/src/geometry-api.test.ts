import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { GeometryAPI, getGeometryAPI, createGeometryAPI } from './geometry-api';

// Mock the dependencies
vi.mock('./worker-client', () => ({
  WorkerClient: vi.fn().mockImplementation(() => ({
    init: vi.fn().mockResolvedValue(undefined),
    invoke: vi.fn().mockResolvedValue({ id: 'shape-1', type: 'solid' }),
    tessellate: vi.fn().mockResolvedValue({
      vertices: new Float32Array([0, 0, 0]),
      indices: new Uint32Array([0, 1, 2]),
      normals: new Float32Array([0, 0, 1])
    }),
    dispose: vi.fn().mockResolvedValue(undefined),
    terminate: vi.fn()
  }))
}));

vi.mock('./mock-geometry', () => ({
  MockGeometry: vi.fn().mockImplementation(() => ({
    createLine: vi.fn().mockReturnValue({ id: 'line-1', type: 'edge' }),
    createCircle: vi.fn().mockReturnValue({ id: 'circle-1', type: 'edge' }),
    createBox: vi.fn().mockReturnValue({ id: 'box-1', type: 'solid' }),
    createCylinder: vi.fn().mockReturnValue({ id: 'cylinder-1', type: 'solid' }),
    createSphere: vi.fn().mockReturnValue({ id: 'sphere-1', type: 'solid' }),
    extrude: vi.fn().mockReturnValue({ id: 'extrude-1', type: 'solid' }),
    booleanUnion: vi.fn().mockReturnValue({ id: 'union-1', type: 'solid' }),
    booleanSubtract: vi.fn().mockReturnValue({ id: 'subtract-1', type: 'solid' }),
    booleanIntersect: vi.fn().mockReturnValue({ id: 'intersect-1', type: 'solid' }),
    tessellate: vi.fn().mockResolvedValue({
      vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
      indices: new Uint32Array([0, 1, 2]),
      normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
    }),
    dispose: vi.fn()
  }))
}));

describe('GeometryAPI', () => {
  let geometryAPI: GeometryAPI;

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should create with mock implementation', () => {
      geometryAPI = new GeometryAPI(true);
      expect(geometryAPI.isUsingMock()).toBe(true);
    });

    it('should create with worker implementation', () => {
      geometryAPI = new GeometryAPI(false);
      expect(geometryAPI.isUsingMock()).toBe(false);
    });

    it('should initialize worker when not using mock', async () => {
      geometryAPI = new GeometryAPI(false);
      await geometryAPI.init();

      const implementation = (geometryAPI as any).implementation;
      expect(implementation.init).toHaveBeenCalled();
    });

    it('should not initialize when using mock', async () => {
      geometryAPI = new GeometryAPI(true);
      await geometryAPI.init();

      const implementation = (geometryAPI as any).implementation;
      expect(implementation.init).toBeUndefined();
    });

    it('should create with custom worker URL', () => {
      geometryAPI = new GeometryAPI(false, 'custom-worker.js');
      expect(geometryAPI.isUsingMock()).toBe(false);
    });
  });

  describe('Mock Operations', () => {
    beforeEach(() => {
      geometryAPI = new GeometryAPI(true);
    });

    it('should create line with mock', async () => {
      const result = await geometryAPI.invoke('CREATE_LINE', {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 1, y: 1, z: 1 }
      });

      expect(result).toEqual({ id: 'line-1', type: 'edge' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.createLine).toHaveBeenCalledWith(
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      );
    });

    it('should create circle with mock', async () => {
      const result = await geometryAPI.invoke('CREATE_CIRCLE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 10,
        normal: { x: 0, y: 0, z: 1 }
      });

      expect(result).toEqual({ id: 'circle-1', type: 'edge' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.createCircle).toHaveBeenCalledWith(
        { x: 0, y: 0, z: 0 },
        10,
        { x: 0, y: 0, z: 1 }
      );
    });

    it('should create rectangle as box with mock', async () => {
      const result = await geometryAPI.invoke('CREATE_RECTANGLE', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50
      });

      expect(result).toEqual({ id: 'box-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.createBox).toHaveBeenCalledWith(
        { x: 0, y: 0, z: 0 },
        100,
        50,
        1
      );
    });

    it('should create box with mock', async () => {
      const result = await geometryAPI.invoke('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 100,
        height: 50,
        depth: 25
      });

      expect(result).toEqual({ id: 'box-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.createBox).toHaveBeenCalledWith(
        { x: 0, y: 0, z: 0 },
        100,
        50,
        25
      );
    });

    it('should create cylinder with mock', async () => {
      const result = await geometryAPI.invoke('MAKE_CYLINDER', {
        center: { x: 0, y: 0, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        radius: 25,
        height: 100
      });

      expect(result).toEqual({ id: 'cylinder-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.createCylinder).toHaveBeenCalled();
    });

    it('should create sphere with mock', async () => {
      const result = await geometryAPI.invoke('MAKE_SPHERE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 50
      });

      expect(result).toEqual({ id: 'sphere-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.createSphere).toHaveBeenCalledWith(
        { x: 0, y: 0, z: 0 },
        50
      );
    });

    it('should extrude profile with mock', async () => {
      const profile: ShapeHandle = { id: 'profile-1', type: 'face' };
      const result = await geometryAPI.invoke('MAKE_EXTRUDE', {
        profile,
        direction: { x: 0, y: 0, z: 1 },
        distance: 100
      });

      expect(result).toEqual({ id: 'extrude-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.extrude).toHaveBeenCalled();
    });

    it('should perform boolean union with mock', async () => {
      const shapes: ShapeHandle[] = [
        { id: 'shape-1', type: 'solid' },
        { id: 'shape-2', type: 'solid' }
      ];
      const result = await geometryAPI.invoke('BOOLEAN_UNION', { shapes });

      expect(result).toEqual({ id: 'union-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.booleanUnion).toHaveBeenCalledWith(shapes);
    });

    it('should perform boolean subtract with mock', async () => {
      const base: ShapeHandle = { id: 'base-1', type: 'solid' };
      const tools: ShapeHandle[] = [{ id: 'tool-1', type: 'solid' }];
      const result = await geometryAPI.invoke('BOOLEAN_SUBTRACT', { base, tools });

      expect(result).toEqual({ id: 'subtract-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.booleanSubtract).toHaveBeenCalledWith(base, tools);
    });

    it('should perform boolean intersect with mock', async () => {
      const shapes: ShapeHandle[] = [
        { id: 'shape-1', type: 'solid' },
        { id: 'shape-2', type: 'solid' }
      ];
      const result = await geometryAPI.invoke('BOOLEAN_INTERSECT', { shapes });

      expect(result).toEqual({ id: 'intersect-1', type: 'solid' });
      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.booleanIntersect).toHaveBeenCalledWith(shapes);
    });

    it('should tessellate shape with mock', async () => {
      const shape: ShapeHandle = {
        id: 'shape-1',
        type: 'solid',
        bbox: {
          min: { x: -10, y: -10, z: -10 },
          max: { x: 10, y: 10, z: 10 }
        }
      };
      const result = await geometryAPI.invoke('TESSELLATE', {
        shape,
        deflection: 0.01
      });

      expect(result).toHaveProperty('mesh');
      expect(result.mesh).toHaveProperty('vertices');
      expect(result.mesh).toHaveProperty('indices');
      expect(result.mesh).toHaveProperty('normals');
      expect(result.bbox).toEqual(shape.bbox);
    });

    it('should handle unknown mock operations', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = await geometryAPI.invoke('UNKNOWN_OPERATION', {});

      expect(consoleSpy).toHaveBeenCalledWith('Mock operation not implemented: UNKNOWN_OPERATION');
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('bbox');

      consoleSpy.mockRestore();
    });
  });

  describe('Worker Operations', () => {
    beforeEach(() => {
      geometryAPI = new GeometryAPI(false);
    });

    it('should invoke operation through worker', async () => {
      const result = await geometryAPI.invoke('CREATE_BOX', {
        width: 100,
        height: 50,
        depth: 25
      });

      expect(result).toEqual({ id: 'shape-1', type: 'solid' });
      const workerImpl = (geometryAPI as any).implementation;
      expect(workerImpl.invoke).toHaveBeenCalledWith('CREATE_BOX', {
        width: 100,
        height: 50,
        depth: 25
      });
    });

    it('should tessellate through worker', async () => {
      const result = await geometryAPI.tessellate('shape-1', 0.01);

      expect(result).toHaveProperty('vertices');
      expect(result).toHaveProperty('indices');
      expect(result).toHaveProperty('normals');
      const workerImpl = (geometryAPI as any).implementation;
      expect(workerImpl.tessellate).toHaveBeenCalledWith('shape-1', 0.01);
    });

    it('should dispose through worker', async () => {
      await geometryAPI.dispose('shape-1');

      const workerImpl = (geometryAPI as any).implementation;
      expect(workerImpl.dispose).toHaveBeenCalledWith('shape-1');
    });
  });

  describe('Mode Switching', () => {
    it('should switch from mock to worker', async () => {
      geometryAPI = new GeometryAPI(true);
      expect(geometryAPI.isUsingMock()).toBe(true);

      await geometryAPI.switchMode(false);
      expect(geometryAPI.isUsingMock()).toBe(false);

      const implementation = (geometryAPI as any).implementation;
      expect(implementation.init).toHaveBeenCalled();
    });

    it('should switch from worker to mock', async () => {
      geometryAPI = new GeometryAPI(false);
      expect(geometryAPI.isUsingMock()).toBe(false);

      const workerImpl = (geometryAPI as any).implementation;
      await geometryAPI.switchMode(true);

      expect(geometryAPI.isUsingMock()).toBe(true);
      expect(workerImpl.terminate).toHaveBeenCalled();
    });

    it('should not switch if already in target mode', async () => {
      geometryAPI = new GeometryAPI(true);
      const originalImpl = (geometryAPI as any).implementation;

      await geometryAPI.switchMode(true);

      expect((geometryAPI as any).implementation).toBe(originalImpl);
    });
  });

  describe('Singleton Functions', () => {
    it('should get singleton instance', () => {
      const api1 = getGeometryAPI(true);
      const api2 = getGeometryAPI(false); // Should return same instance

      expect(api1).toBe(api2);
    });

    it('should create new instance', () => {
      const api1 = createGeometryAPI(true);
      const api2 = createGeometryAPI(true);

      expect(api1).not.toBe(api2);
    });

    it('should create with custom worker URL', () => {
      const api = createGeometryAPI(false, 'custom-worker.js');
      expect(api.isUsingMock()).toBe(false);
    });
  });

  describe('Tessellation', () => {
    it('should tessellate with mock implementation', async () => {
      geometryAPI = new GeometryAPI(true);
      const result = await geometryAPI.tessellate('shape-1', 0.01);

      expect(result).toHaveProperty('vertices');
      expect(result).toHaveProperty('indices');
      expect(result).toHaveProperty('normals');
      expect(result.vertices).toBeInstanceOf(Float32Array);
      expect(result.indices).toBeInstanceOf(Uint32Array);
      expect(result.normals).toBeInstanceOf(Float32Array);
    });

    it('should tessellate with worker implementation', async () => {
      geometryAPI = new GeometryAPI(false);
      const result = await geometryAPI.tessellate('shape-1', 0.01);

      expect(result).toHaveProperty('vertices');
      expect(result).toHaveProperty('indices');
      expect(result).toHaveProperty('normals');
      const workerImpl = (geometryAPI as any).implementation;
      expect(workerImpl.tessellate).toHaveBeenCalledWith('shape-1', 0.01);
    });
  });

  describe('Disposal', () => {
    it('should dispose with mock implementation', async () => {
      geometryAPI = new GeometryAPI(true);
      await geometryAPI.dispose('shape-1');

      const mockImpl = (geometryAPI as any).implementation;
      expect(mockImpl.dispose).toHaveBeenCalledWith('shape-1');
    });

    it('should dispose with worker implementation', async () => {
      geometryAPI = new GeometryAPI(false);
      await geometryAPI.dispose('shape-1');

      const workerImpl = (geometryAPI as any).implementation;
      expect(workerImpl.dispose).toHaveBeenCalledWith('shape-1');
    });
  });

  describe('Type Safety', () => {
    it('should handle typed invoke operations', async () => {
      geometryAPI = new GeometryAPI(false);

      const result = await geometryAPI.invoke<ShapeHandle>('CREATE_BOX', {
        width: 100,
        height: 50,
        depth: 25
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('type');
    });

    it('should return correct types for different operations', async () => {
      geometryAPI = new GeometryAPI(true);

      const box = await geometryAPI.invoke<ShapeHandle>('MAKE_BOX', {
        center: { x: 0, y: 0, z: 0 },
        width: 10,
        height: 10,
        depth: 10
      });
      expect(box.type).toBe('solid');

      const line = await geometryAPI.invoke<ShapeHandle>('CREATE_LINE', {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 1, y: 1, z: 1 }
      });
      expect(line.type).toBe('edge');

      const circle = await geometryAPI.invoke<ShapeHandle>('CREATE_CIRCLE', {
        center: { x: 0, y: 0, z: 0 },
        radius: 5,
        normal: { x: 0, y: 0, z: 1 }
      });
      expect(circle.type).toBe('edge');
    });
  });
});