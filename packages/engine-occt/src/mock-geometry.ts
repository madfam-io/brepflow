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
  private counters = new Map<string, number>();

  /**
   * Initialize the mock geometry system
   */
  async init(): Promise<void> {
    // No initialization needed for mock geometry
    console.log('[MockGeometry] Initialized');
  }

  async terminate(): Promise<void> {
    this.shapes.clear();
  }

  /**
   * Create a mock shape handle
   */
  private createHandle(type: string, bbox?: BoundingBox): ShapeHandle {
    // Generate predictable IDs for testing
    const counter = (this.counters.get(type) || 0) + 1;
    this.counters.set(type, counter);
    const id = `${type}-${counter}`;

    const handle: ShapeHandle = {
      id,
      type: 'SOLID',
      bbox: bbox || this.defaultBBox(),
      hash: id.substring(0, 16),
      metadata: {
        sourceType: type,
      },
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
      case 'box':
        return this.generateBoxMesh();
      case 'sphere':
        return this.generateSphereMesh();
      case 'cylinder':
        return this.generateCylinderMesh();
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

    const mesh = {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
    // Legacy compatibility: add vertices alias for positions
    (mesh as any).vertices = mesh.positions;
    return mesh;
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

    const mesh = {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
    // Legacy compatibility: add vertices alias for positions
    (mesh as any).vertices = mesh.positions;
    return mesh;
  }

  /**
   * Generate line mesh
   */
  private generateLineMesh(): MeshData {
    const vertices = [-50, 0, 0, 50, 0, 0];
    const normals = [0, 1, 0, 0, 1, 0];
    const indices = [0, 1];

    const mesh = {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
    // Legacy compatibility: add vertices alias for positions
    (mesh as any).vertices = mesh.positions;
    return mesh;
  }

  /**
   * Generate sphere mesh
   */
  private generateSphereMesh(): MeshData {
    const radius = 25;
    const segments = 8;
    const vertices: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];

    // Simple sphere approximation
    for (let i = 0; i <= segments; i++) {
      const phi = (i / segments) * Math.PI;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * 2 * Math.PI;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        vertices.push(x, y, z);
        normals.push(x / radius, y / radius, z / radius);
      }
    }

    // Generate indices for triangles
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = a + segments + 1;

        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const mesh = {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
    // Legacy compatibility: add vertices alias for positions
    (mesh as any).vertices = mesh.positions;
    return mesh;
  }

  /**
   * Generate cylinder mesh
   */
  private generateCylinderMesh(): MeshData {
    const radius = 25;
    const height = 50;
    const segments = 8;
    const vertices: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];

    // Generate vertices for cylinder sides
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * 2 * Math.PI;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);

      // Bottom ring
      vertices.push(x, -height/2, z);
      normals.push(x / radius, 0, z / radius);

      // Top ring
      vertices.push(x, height/2, z);
      normals.push(x / radius, 0, z / radius);
    }

    // Generate indices for cylinder sides
    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = (i + 1) * 2;
      const d = c + 1;

      indices.push(a, c, b);
      indices.push(b, c, d);
    }

    const mesh = {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
    // Legacy compatibility: add vertices alias for positions
    (mesh as any).vertices = mesh.positions;
    return mesh;
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
    return this.createHandle('box', bbox);
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
    return this.createHandle('cylinder', bbox);
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
    return this.createHandle('sphere', bbox);
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
    return this.createHandle('union', bbox);
  }

  booleanSubtract(base: ShapeHandle, tools: ShapeHandle[]): ShapeHandle {
    // Mock subtract - use base bbox
    return this.createHandle('subtract', base.bbox);
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
    return this.createHandle('intersect', bbox);
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
      case 'tessellate': {
        const meshData = await this.tessellate(params.shape, params.deflection);
        // Ensure vertices property exists for direct tessellation
        if (!('vertices' in meshData)) {
          (meshData as any).vertices = meshData.positions;
        }
        return meshData as T;
      }
      case 'MAKE_BOX':
        return this.createBox(params.center || {x: 0, y: 0, z: 0}, params.width, params.height, params.depth) as T;
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
      case 'BOOLEAN_UNION': {
        const result = this.booleanUnion(params.shapes);
        return (result?.id ? result : { id: 'union-1', type: 'union' }) as T;
      }
      case 'BOOLEAN_SUBTRACT': {
        const result = this.booleanSubtract(params.base, params.tools);
        return (result?.id ? result : { id: 'subtract-1', type: 'subtract' }) as T;
      }
      case 'BOOLEAN_INTERSECT': {
        const result = this.booleanIntersect(params.shapes);
        return (result?.id ? result : { id: 'intersect-1', type: 'intersect' }) as T;
      }
      case 'TESSELLATE': {
        // Return mesh wrapped in object for legacy compatibility
        const meshData = await this.tessellate(params.shape, params.deflection || params.tolerance);
        return { mesh: meshData } as T;
      }
      case 'EXPORT_STEP':
        return this.createMockSTEP() as T;
      case 'EXPORT_STL':
        return this.createMockSTL() as T;
      case 'EXPORT_IGES':
        return this.createMockIGES() as T;
      case 'EXPORT_OBJ':
        return this.createMockOBJ() as T;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  // Updated tessellate method for WorkerAPI compatibility
  async tessellate(shapeId: HandleId | ShapeHandle, deflection: number): Promise<MeshData> {
    let mesh: MeshData;
    if (typeof shapeId === 'string') {
      const shape = this.shapes.get(shapeId);
      mesh = shape ? shape.mesh : this.generateBoxMesh();
    } else {
      // Handle ShapeHandle object
      const shape = this.shapes.get(shapeId.id);
      mesh = shape ? shape.mesh : this.generateMockMesh(shapeId.type || 'box');
    }

    // Ensure vertices property exists for legacy compatibility
    if (!('vertices' in mesh)) {
      (mesh as any).vertices = mesh.positions;
    }

    return mesh;
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

  private createMockSTEP(): string {
    return `ISO-10303-21;# BrepFlow Mock STEP`;
  }

  private createMockSTL(): string {
    return `solid brepflow\n  facet normal 0 0 1\n    outer loop\n      vertex 0 0 0\n      vertex 1 0 0\n      vertex 0 1 0\n    endloop\n  endfacet\nendsolid brepflow`;
  }

  private createMockIGES(): string {
    return `IGES;BrepFlow Mock Export;${new Date().toISOString()}`;
  }

  private createMockOBJ(): string {
    return `# BrepFlow OBJ Mock\nv 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3`;
  }
}

interface MockShape {
  handle: ShapeHandle;
  mesh: MeshData;
}
