import type { WorkerAPI, MeshData } from '@brepflow/types';

/**
 * Mock implementation for testing
 */
class MockGeometry {
  private idCounter = 0;

  async init(): Promise<void> {
    // No initialization needed for mock
  }


  async invoke<T = any>(operation: string, params: any): Promise<T> {
    // Generate mock responses based on operation
    const id = `shape-${++this.idCounter}`;
    const result: any = {
      id,
      type: this.getTypeForOperation(operation),
      bbox_min_x: -50,
      bbox_min_y: -50,
      bbox_min_z: -50,
      bbox_max_x: 50,
      bbox_max_y: 50,
      bbox_max_z: 50,
      hash: `hash-${id}`,
      volume: 1000,
      area: 600,
      centerX: 0,
      centerY: 0,
      centerZ: 0
    };

    if (operation === 'TESSELLATE') {
      return {
        mesh: {
          vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
          indices: new Uint32Array([0, 1, 2]),
          normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
        },
        bbox: params.shape?.bbox || {
          min: { x: -50, y: -50, z: -50 },
          max: { x: 50, y: 50, z: 50 }
        }
      } as T;
    }

    return result as T;
  }

  private getTypeForOperation(operation: string): string {
    if (operation.includes('LINE') || operation.includes('CIRCLE')) return 'edge';
    if (operation.includes('FACE') || operation.includes('RECTANGLE')) return 'face';
    return 'solid';
  }

  async tessellate(_shapeId: string, _deflection: number): Promise<any> {
    const mesh = {
      positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
      normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]),
      indices: new Uint32Array([0, 1, 2]),
      edges: new Uint32Array([0, 1, 1, 2, 2, 0]),
      vertexCount: 3,
      triangleCount: 1,
      edgeCount: 3
    };
    return {
      ...mesh,
      vertices: mesh.positions  // Add vertices alias for compatibility
    };
  }

  async dispose(shapeId: string): Promise<void> {
    // Mock disposal
    console.log(`[Mock] Disposed shape: ${shapeId}`);
  }

  terminate(): void {
    // No cleanup needed for mock
  }

  // Mock-specific methods for testing
  createLine(_start: any, _end: any): any {
    return { id: 'line-1', type: 'edge' };
  }

  createCircle(center: any, radius: number, normal: any): any {
    return { id: 'circle-1', type: 'edge' };
  }

  createBox(center: any, width: number, height: number, depth: number): any {
    return { id: 'box-1', type: 'solid' };
  }

  createCylinder(...args: any[]): any {
    return { id: 'cylinder-1', type: 'solid' };
  }

  createSphere(center: any, radius: number): any {
    return { id: 'sphere-1', type: 'solid' };
  }

  extrude(...args: any[]): any {
    return { id: 'extrude-1', type: 'solid' };
  }

  booleanUnion(shapes: any[]): any {
    return { id: 'union-1', type: 'solid' };
  }

  booleanSubtract(base: any, tools: any[]): any {
    return { id: 'subtract-1', type: 'solid' };
  }

  booleanIntersect(shapes: any[]): any {
    return { id: 'intersect-1', type: 'solid' };
  }
}

// Import the real WorkerClient
import { WorkerClient } from './worker-client';

/**
 * Geometry API - Production Ready with Mock/Real Support
 */
export class GeometryAPI implements WorkerAPI {
  private implementation: MockGeometry | WorkerClient;
  private useMock: boolean;

  constructor(useMock: boolean = false, workerUrl?: string) {
    this.useMock = useMock;
    if (useMock) {
      this.implementation = new MockGeometry();
    } else {
      this.implementation = new WorkerClient(workerUrl || '/occt-worker.js');
    }
  }

  /**
   * Initialize the API
   */
  async init(): Promise<void> {
    if (this.implementation && 'init' in this.implementation) {
      await this.implementation.init();
    }
    console.log(`[GeometryAPI] Initialized with ${this.useMock ? 'mock' : 'real'} OCCT`);
  }

  /**
   * Invoke geometry operation
   */
  async invoke<T = any>(operation: string, params: any): Promise<T> {
    // Handle mock-specific operations
    if (this.useMock && this.implementation instanceof MockGeometry) {
      const mock = this.implementation as MockGeometry;

      switch (operation) {
        case 'CREATE_LINE':
          return mock.createLine(params.start, params.end) as T;
        case 'CREATE_CIRCLE':
          return mock.createCircle(params.center, params.radius, params.normal) as T;
        case 'CREATE_RECTANGLE':
          return mock.createBox(params.center, params.width, params.height, 1) as T;
        case 'MAKE_BOX':
          return mock.createBox(params.center, params.width, params.height, params.depth) as T;
        case 'MAKE_CYLINDER':
          return mock.createCylinder(params.center, params.axis, params.radius, params.height) as T;
        case 'MAKE_SPHERE':
          return mock.createSphere(params.center, params.radius) as T;
        case 'MAKE_EXTRUDE':
          return mock.extrude(params.profile, params.direction, params.distance) as T;
        case 'BOOLEAN_UNION':
          return mock.booleanUnion(params.shapes) as T;
        case 'BOOLEAN_SUBTRACT':
          return mock.booleanSubtract(params.base, params.tools) as T;
        case 'BOOLEAN_INTERSECT':
          return mock.booleanIntersect(params.shapes) as T;
        case 'TESSELLATE':
          // Handle tessellation specially
          return {
            mesh: await mock.tessellate(params.shape?.id || 'unknown', params.deflection || 0.01),
            bbox: params.shape?.bbox || {
              min: { x: -50, y: -50, z: -50 },
              max: { x: 50, y: 50, z: 50 }
            }
          } as T;
        default:
          console.warn(`Mock operation not implemented: ${operation}`);
          return mock.invoke<T>(operation, params);
      }
    }

    // For WorkerClient, use its invoke method
    if ('invoke' in this.implementation) {
      return this.implementation.invoke<T>(operation, params);
    }

    // Fallback for unexpected cases
    throw new Error(`Unable to invoke operation: ${operation}`);
  }

  /**
   * Tessellate shape to mesh
   */
  async tessellate(shapeId: string, deflection: number): Promise<MeshData> {
    return await this.implementation.tessellate(shapeId, deflection);
  }

  /**
   * Dispose shape handle
   */
  async dispose(handleId: string): Promise<void> {
    return this.implementation.dispose(handleId);
  }

  /**
   * Check if using mock
   */
  isUsingMock(): boolean {
    return this.useMock;
  }

  /**
   * Check if using real OCCT
   */
  isUsingRealOCCT(): boolean {
    return !this.useMock;
  }

  /**
   * Switch between mock and real mode
   */
  async switchMode(useMock: boolean, workerUrl?: string): Promise<void> {
    if (useMock === this.useMock) {
      return; // Already in the requested mode
    }

    // Terminate current implementation if it has a terminate method
    if (this.implementation && 'terminate' in this.implementation) {
      this.implementation.terminate();
    }

    // Switch to new mode
    this.useMock = useMock;
    if (useMock) {
      this.implementation = new MockGeometry();
    } else {
      this.implementation = new WorkerClient(workerUrl || '/occt-worker.js');
    }

    // Initialize new implementation
    await this.init();
  }

  /**
   * Get worker status
   */
  async getStatus(): Promise<any> {
    return this.implementation.invoke('HEALTH_CHECK', {});
  }

  /**
   * Terminate worker
   */
  async terminate(): Promise<void> {
    if (this.implementation && 'terminate' in this.implementation) {
      this.implementation.terminate();
    }
  }
}

// Singleton instance
let singletonInstance: GeometryAPI | null = null;

/**
 * Get singleton instance of GeometryAPI
 */
export function getGeometryAPI(useMock: boolean = false, workerUrl?: string): GeometryAPI {
  if (!singletonInstance) {
    singletonInstance = new GeometryAPI(useMock, workerUrl);
  }
  return singletonInstance;
}

/**
 * Create new instance of GeometryAPI
 */
export function createGeometryAPI(useMock: boolean = false, workerUrl?: string): GeometryAPI {
  return new GeometryAPI(useMock, workerUrl);
}