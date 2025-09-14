import type { WorkerAPI, ShapeHandle, MeshData } from '@brepflow/types';
import { WorkerClient } from './worker-client';
import { MockGeometry } from './mock-geometry';

/**
 * Geometry API that can use either real OCCT or mock geometry
 */
export class GeometryAPI implements WorkerAPI {
  private implementation: WorkerAPI | MockGeometry;
  private useMock: boolean;

  constructor(useMock = false, workerUrl?: string) {
    this.useMock = useMock;

    if (useMock) {
      this.implementation = new MockGeometry();
    } else {
      this.implementation = new WorkerClient(workerUrl);
    }
  }

  /**
   * Initialize the API
   */
  async init(): Promise<void> {
    if (!this.useMock && this.implementation instanceof WorkerClient) {
      await this.implementation.init();
    }
  }

  /**
   * Invoke geometry operation
   */
  async invoke<T = any>(operation: string, params: any): Promise<T> {
    if (this.useMock && this.implementation instanceof MockGeometry) {
      // Map operations to mock methods
      return this.invokeMock(operation, params) as T;
    }

    return this.implementation.invoke(operation, params);
  }

  /**
   * Invoke mock operation
   */
  private invokeMock(operation: string, params: any): any {
    const mock = this.implementation as MockGeometry;

    switch (operation) {
      case 'CREATE_LINE':
        return mock.createLine(params.start, params.end);

      case 'CREATE_CIRCLE':
        return mock.createCircle(params.center, params.radius, params.normal);

      case 'CREATE_RECTANGLE':
        // Create as a box with small height for now
        return mock.createBox(params.center, params.width, params.height, 1);

      case 'MAKE_BOX':
        return mock.createBox(params.center, params.width, params.height, params.depth);

      case 'MAKE_CYLINDER':
        return mock.createCylinder(params.center, params.axis, params.radius, params.height);

      case 'MAKE_SPHERE':
        return mock.createSphere(params.center, params.radius);

      case 'MAKE_EXTRUDE':
        return mock.extrude(params.profile, params.direction, params.distance);

      case 'BOOLEAN_UNION':
        return mock.booleanUnion(params.shapes);

      case 'BOOLEAN_SUBTRACT':
        return mock.booleanSubtract(params.base, params.tools);

      case 'BOOLEAN_INTERSECT':
        return mock.booleanIntersect(params.shapes);

      case 'TESSELLATE':
        return {
          mesh: mock.tessellate(params.shape, params.deflection),
          bbox: params.shape.bbox,
        };

      default:
        console.warn(`Mock operation not implemented: ${operation}`);
        return this.createMockHandle();
    }
  }

  /**
   * Create a default mock handle
   */
  private createMockHandle(): ShapeHandle {
    return {
      id: Math.random().toString(36).substring(7),
      type: 'solid',
      bbox: {
        min: { x: -50, y: -50, z: -50 },
        max: { x: 50, y: 50, z: 50 },
      },
    };
  }

  /**
   * Tessellate shape to mesh
   */
  async tessellate(shapeId: string, deflection: number): Promise<MeshData> {
    if (this.useMock && this.implementation instanceof MockGeometry) {
      const shape: ShapeHandle = { id: shapeId, type: 'solid' };
      return this.implementation.tessellate(shape, deflection);
    }

    return this.implementation.tessellate(shapeId, deflection);
  }

  /**
   * Dispose shape handle
   */
  async dispose(handleId: string): Promise<void> {
    if (this.useMock && this.implementation instanceof MockGeometry) {
      this.implementation.dispose(handleId);
      return;
    }

    return this.implementation.dispose(handleId);
  }

  /**
   * Check if using mock geometry
   */
  isUsingMock(): boolean {
    return this.useMock;
  }

  /**
   * Switch between mock and real geometry
   */
  async switchMode(useMock: boolean): Promise<void> {
    if (useMock === this.useMock) return;

    // Clean up old implementation
    if (!this.useMock && this.implementation instanceof WorkerClient) {
      this.implementation.terminate();
    }

    // Create new implementation
    this.useMock = useMock;
    if (useMock) {
      this.implementation = new MockGeometry();
    } else {
      this.implementation = new WorkerClient();
      await this.implementation.init();
    }
  }
}

// Singleton instance
let geometryAPI: GeometryAPI | null = null;

/**
 * Get or create geometry API instance
 */
export function getGeometryAPI(useMock = false): GeometryAPI {
  if (!geometryAPI) {
    // Default to OCCT now that WASM is available
    geometryAPI = new GeometryAPI(useMock);
  }
  return geometryAPI;
}

/**
 * Create a new geometry API instance
 */
export function createGeometryAPI(useMock = false, workerUrl?: string): GeometryAPI {
  return new GeometryAPI(useMock, workerUrl);
}