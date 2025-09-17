import type {
  ShapeHandle,
  Vec3,
  BoundingBox,
  MeshData,
  WorkerAPI,
  HandleId,
} from '@brepflow/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Mock geometry provider for testing without OCCT
 */
export class MockGeometry implements WorkerAPI {
  private shapes = new Map<string, MockShape>();

  /**
   * Create a mock shape handle
   */
  private createHandle(type: 'solid' | 'surface' | 'curve', bbox?: BoundingBox): ShapeHandle {
    const id = uuidv4();
    const handle: ShapeHandle = {
      id,
      type,
      bbox: bbox || this.defaultBBox(),
      hash: id.substring(0, 16),
    };

    this.shapes.set(id, {
      handle,
      mesh: this.generateMockMesh(type),
    });

    return handle;
  }

  /**
   * Default bounding box
   */
  private defaultBBox(): BoundingBox {
    return {
      min: { x: -50, y: -50, z: -50 },
      max: { x: 50, y: 50, z: 50 },
    };
  }

  /**
   * Generate mock mesh data
   */
  private generateMockMesh(type: string): MeshData {
    switch (type) {
      case 'solid':
        return this.generateBoxMesh();
      case 'surface':
        return this.generatePlaneMesh();
      case 'curve':
        return this.generateLineMesh();
      default:
        return this.generateBoxMesh();
    }
  }

  /**
   * Generate box mesh
   */
  private generateBoxMesh(): MeshData {
    const size = 50;
    const vertices = [
      // Front face
      -size, -size, size,
      size, -size, size,
      size, size, size,
      -size, size, size,
      // Back face
      -size, -size, -size,
      -size, size, -size,
      size, size, -size,
      size, -size, -size,
    ];

    const normals = [
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    ];

    const indices = [
      0, 1, 2, 2, 3, 0, // front
      4, 5, 6, 6, 7, 4, // back
    ];

    return {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
  }

  /**
   * Generate plane mesh
   */
  private generatePlaneMesh(): MeshData {
    const size = 50;
    const vertices = [
      -size, -size, 0,
      size, -size, 0,
      size, size, 0,
      -size, size, 0,
    ];

    const normals = [
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    ];

    const indices = [0, 1, 2, 2, 3, 0];

    return {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
  }

  /**
   * Generate line mesh
   */
  private generateLineMesh(): MeshData {
    const vertices = [-50, 0, 0, 50, 0, 0];
    const normals = [0, 1, 0, 0, 1, 0];
    const indices = [0, 1];

    return {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
  }

  // Geometry creation methods
  createLine(start: Vec3, end: Vec3): ShapeHandle {
    const bbox: BoundingBox = {
      min: {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        z: Math.min(start.z, end.z),
      },
      max: {
        x: Math.max(start.x, end.x),
        y: Math.max(start.y, end.y),
        z: Math.max(start.z, end.z),
      },
    };
    return this.createHandle('curve', bbox);
  }

  createCircle(center: Vec3, radius: number, _normal: Vec3): ShapeHandle {
    const bbox: BoundingBox = {
      min: {
        x: center.x - radius,
        y: center.y - radius,
        z: center.z - radius,
      },
      max: {
        x: center.x + radius,
        y: center.y + radius,
        z: center.z + radius,
      },
    };
    return this.createHandle('curve', bbox);
  }

  createBox(center: Vec3, width: number, height: number, depth: number): ShapeHandle {
    const bbox: BoundingBox = {
      min: {
        x: center.x - width / 2,
        y: center.y - height / 2,
        z: center.z - depth / 2,
      },
      max: {
        x: center.x + width / 2,
        y: center.y + height / 2,
        z: center.z + depth / 2,
      },
    };
    return this.createHandle('solid', bbox);
  }

  createCylinder(center: Vec3, axis: Vec3, radius: number, height: number): ShapeHandle {
    const bbox: BoundingBox = {
      min: {
        x: center.x - radius,
        y: center.y - radius,
        z: center.z,
      },
      max: {
        x: center.x + radius,
        y: center.y + radius,
        z: center.z + height,
      },
    };
    return this.createHandle('solid', bbox);
  }

  createSphere(center: Vec3, radius: number): ShapeHandle {
    const bbox: BoundingBox = {
      min: {
        x: center.x - radius,
        y: center.y - radius,
        z: center.z - radius,
      },
      max: {
        x: center.x + radius,
        y: center.y + radius,
        z: center.z + radius,
      },
    };
    return this.createHandle('solid', bbox);
  }

  // Operations
  extrude(profile: ShapeHandle, direction: Vec3, distance: number): ShapeHandle {
    // Mock extrude - just return a solid with expanded bbox
    const bbox = profile.bbox || this.defaultBBox();
    const newBbox: BoundingBox = {
      min: { ...bbox.min },
      max: {
        x: bbox.max.x + direction.x * distance,
        y: bbox.max.y + direction.y * distance,
        z: bbox.max.z + direction.z * distance,
      },
    };
    return this.createHandle('solid', newBbox);
  }

  booleanUnion(shapes: ShapeHandle[]): ShapeHandle {
    // Mock union - combine bounding boxes
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (const shape of shapes) {
      const bbox = shape.bbox || this.defaultBBox();
      minX = Math.min(minX, bbox.min.x);
      minY = Math.min(minY, bbox.min.y);
      minZ = Math.min(minZ, bbox.min.z);
      maxX = Math.max(maxX, bbox.max.x);
      maxY = Math.max(maxY, bbox.max.y);
      maxZ = Math.max(maxZ, bbox.max.z);
    }

    const bbox: BoundingBox = {
      min: { x: minX, y: minY, z: minZ },
      max: { x: maxX, y: maxY, z: maxZ },
    };
    return this.createHandle('solid', bbox);
  }

  booleanSubtract(base: ShapeHandle, tools: ShapeHandle[]): ShapeHandle {
    // Mock subtract - use base bbox
    return this.createHandle('solid', base.bbox);
  }

  booleanIntersect(shapes: ShapeHandle[]): ShapeHandle {
    // Mock intersect - use smallest bbox
    let bbox = shapes[0]?.bbox || this.defaultBBox();
    for (const shape of shapes.slice(1)) {
      if (shape.bbox) {
        bbox = {
          min: {
            x: Math.max(bbox.min.x, shape.bbox.min.x),
            y: Math.max(bbox.min.y, shape.bbox.min.y),
            z: Math.max(bbox.min.z, shape.bbox.min.z),
          },
          max: {
            x: Math.min(bbox.max.x, shape.bbox.max.x),
            y: Math.min(bbox.max.y, shape.bbox.max.y),
            z: Math.min(bbox.max.z, shape.bbox.max.z),
          },
        };
      }
    }
    return this.createHandle('solid', bbox);
  }

  // Legacy tessellation method removed - using async version below

  // WorkerAPI interface implementation
  async invoke<T>(operation: string, params: any): Promise<T> {
    switch (operation) {
      case 'createBox':
        return this.createBox(params.center, params.width, params.height, params.depth) as T;
      case 'createSphere':
        return this.createSphere(params.center, params.radius) as T;
      case 'createCylinder':
        return this.createCylinder(params.center, params.axis, params.radius, params.height) as T;
      case 'createLine':
        return this.createLine(params.start, params.end) as T;
      case 'createCircle':
        return this.createCircle(params.center, params.radius, params.normal) as T;
      case 'extrude':
        return this.extrude(params.profile, params.direction, params.distance) as T;
      case 'booleanUnion':
        return this.booleanUnion(params.shapes) as T;
      case 'booleanSubtract':
        return this.booleanSubtract(params.base, params.tools) as T;
      case 'booleanIntersect':
        return this.booleanIntersect(params.shapes) as T;
      case 'tessellate':
        return this.tessellate(params.shape, params.deflection) as T;
      case 'MAKE_BOX':
        return this.createBox(params.center, params.width, params.height, params.depth) as T;
      case 'MAKE_SPHERE':
        return this.createSphere(params.center, params.radius) as T;
      case 'MAKE_CYLINDER':
        return this.createCylinder(params.center, params.axis, params.radius, params.height) as T;
      case 'MAKE_FILLET':
        // Mock fillet - return shape as-is with new ID
        return this.createHandle('solid', params.shape?.bbox) as T;
      case 'MAKE_CHAMFER':
        // Mock chamfer - return shape as-is with new ID
        return this.createHandle('solid', params.shape?.bbox) as T;
      case 'MAKE_SHELL':
        // Mock shell - return shape as-is with new ID
        return this.createHandle('solid', params.shape?.bbox) as T;
      case 'MAKE_DRAFT':
        // Mock draft - return shape as-is with new ID
        return this.createHandle('solid', params.shape?.bbox) as T;
      case 'MAKE_OFFSET':
        // Mock offset - return shape as-is with new ID
        return this.createHandle('solid', params.shape?.bbox) as T;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  async init(): Promise<void> {
    // Mock initialization - no-op
  }

  // Updated tessellate method for WorkerAPI compatibility
  async tessellate(shapeId: HandleId | ShapeHandle, deflection: number): Promise<MeshData> {
    if (typeof shapeId === 'string') {
      const shape = this.shapes.get(shapeId);
      return shape ? shape.mesh : this.generateBoxMesh();
    } else {
      // Handle ShapeHandle object
      const shape = this.shapes.get(shapeId.id);
      return shape ? shape.mesh : this.generateBoxMesh();
    }
  }

  // Updated dispose method for WorkerAPI compatibility
  async dispose(handleId: HandleId): Promise<void> {
    this.shapes.delete(handleId);
  }

  // Legacy synchronous methods for backward compatibility
  tessellateSync(shape: ShapeHandle, deflection: number): MeshData {
    const mockShape = this.shapes.get(shape.id);
    if (mockShape) {
      return mockShape.mesh;
    }
    return this.generateBoxMesh();
  }

  disposeSync(handleId: string): void {
    this.shapes.delete(handleId);
  }
}

interface MockShape {
  handle: ShapeHandle;
  mesh: MeshData;
}