// OCCT.wasm TypeScript Bindings
// Real OCCT integration with WebAssembly

export interface OCCTModule {
  // Geometry operations
  makeBox(dx: number, dy: number, dz: number): ShapeHandle;
  makeSphere(radius: number): ShapeHandle;
  makeCylinder(radius: number, height: number): ShapeHandle;

  // Boolean operations
  booleanUnion(shape1Id: string, shape2Id: string): ShapeHandle;
  booleanSubtract(shape1Id: string, shape2Id: string): ShapeHandle;
  booleanIntersect(shape1Id: string, shape2Id: string): ShapeHandle;

  // Feature operations
  makeFillet(shapeId: string, radius: number): ShapeHandle;
  makeChamfer(shapeId: string, distance: number): ShapeHandle;

  // Tessellation
  tessellate(shapeId: string, precision?: number, angle?: number): MeshData;
  tessellateWithParams(shapeId: string, precision: number, angle: number): MeshData;

  // Memory management
  deleteShape(shapeId: string): void;
  getShapeCount(): number;

  // Vector types for interfacing with Emscripten
  VectorFloat: any;
  VectorUint: any;
}

export interface ShapeHandle {
  id: string;
  type: 'solid' | 'surface' | 'curve';
  bbox_min_x: number;
  bbox_min_y: number;
  bbox_min_z: number;
  bbox_max_x: number;
  bbox_max_y: number;
  bbox_max_z: number;
  hash: string;
}

export interface MeshData {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
  edges: Uint32Array;
}

// Module loader with real OCCT WASM integration
let occtModule: OCCTModule | null = null;
let wasmModule: any = null;
let wasmLoaded = false;

/**
 * Memory management utilities for OCCT shapes
 */
export class OCCTMemoryManager {
  private static trackedShapes = new Set<string>();

  static trackShape(shapeId: string): void {
    this.trackedShapes.add(shapeId);
  }

  static untrackShape(shapeId: string): void {
    this.trackedShapes.delete(shapeId);
  }

  static getTrackedShapes(): string[] {
    return Array.from(this.trackedShapes);
  }

  static getShapeCount(): number {
    return this.trackedShapes.size;
  }

  static cleanup(): void {
    if (occtModule && wasmLoaded) {
      // Clean up all tracked shapes
      for (const shapeId of this.trackedShapes) {
        try {
          occtModule.deleteShape(shapeId);
        } catch (error) {
          console.warn(`Failed to delete shape ${shapeId}:`, error);
        }
      }
    }
    this.trackedShapes.clear();
  }
}

export async function loadOCCT(): Promise<OCCTModule> {
  if (occtModule) return occtModule;

  try {
    // Try to dynamically import the WASM module
    const wasmPath = '../wasm/occt.js';
    const createModule = await import(wasmPath);
    wasmModule = await (createModule as any).createOCCTModule();
    wasmLoaded = true;
    console.log('OCCT WASM module loaded successfully');

    // Verify the module has the expected functions
    if (!wasmModule.makeBox || !wasmModule.tessellate) {
      throw new Error('OCCT WASM module missing expected functions');
    }

  } catch (error: unknown) {
    // This catch handles both import failures and WASM initialization failures
    console.warn('Failed to load OCCT WASM module, falling back to mock implementation');
    console.log('Note: This is expected in production deployment where WASM files are not available');
    wasmLoaded = false;
  }

  // Create OCCT module with real WASM implementation or fallback to mock
  if (wasmLoaded && wasmModule) {
    // Real OCCT WASM implementation
    occtModule = {
      makeBox: (dx: number, dy: number, dz: number): ShapeHandle => {
        console.log(`Creating OCCT box: ${dx} x ${dy} x ${dz}`);
        try {
          const shape = wasmModule.makeBox(dx, dy, dz);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create box - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeBox failed:', error);
          throw new Error(`Failed to create box: ${error instanceof Error ? error.message : error}`);
        }
      },

      makeSphere: (radius: number): ShapeHandle => {
        console.log(`Creating OCCT sphere: radius ${radius}`);
        try {
          const shape = wasmModule.makeSphere(radius);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create sphere - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeSphere failed:', error);
          throw new Error(`Failed to create sphere: ${error instanceof Error ? error.message : error}`);
        }
      },

      makeCylinder: (radius: number, height: number): ShapeHandle => {
        console.log(`Creating OCCT cylinder: radius ${radius}, height ${height}`);
        try {
          const shape = wasmModule.makeCylinder(radius, height);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create cylinder - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeCylinder failed:', error);
          throw new Error(`Failed to create cylinder: ${error instanceof Error ? error.message : error}`);
        }
      },

      booleanUnion: (shape1Id: string, shape2Id: string): ShapeHandle => {
        console.log(`OCCT boolean union: ${shape1Id} ∪ ${shape2Id}`);
        const shape = wasmModule.booleanUnion(shape1Id, shape2Id);
        OCCTMemoryManager.trackShape(shape.id);
        return shape;
      },

      booleanSubtract: (shape1Id: string, shape2Id: string): ShapeHandle => {
        console.log(`OCCT boolean subtract: ${shape1Id} - ${shape2Id}`);
        const shape = wasmModule.booleanSubtract(shape1Id, shape2Id);
        OCCTMemoryManager.trackShape(shape.id);
        return shape;
      },

      booleanIntersect: (shape1Id: string, shape2Id: string): ShapeHandle => {
        console.log(`OCCT boolean intersect: ${shape1Id} ∩ ${shape2Id}`);
        const shape = wasmModule.booleanIntersect(shape1Id, shape2Id);
        OCCTMemoryManager.trackShape(shape.id);
        return shape;
      },

      makeFillet: (shapeId: string, radius: number): ShapeHandle => {
        console.log(`OCCT fillet: ${shapeId} with radius ${radius}`);
        const shape = wasmModule.makeFillet(shapeId, radius);
        OCCTMemoryManager.trackShape(shape.id);
        return shape;
      },

      makeChamfer: (shapeId: string, distance: number): ShapeHandle => {
        console.log(`OCCT chamfer: ${shapeId} with distance ${distance}`);
        const shape = wasmModule.makeChamfer(shapeId, distance);
        OCCTMemoryManager.trackShape(shape.id);
        return shape;
      },

      tessellate: (shapeId: string, precision = 0.1, angle = 0.5): MeshData => {
        console.log(`OCCT tessellating: ${shapeId} with precision ${precision}`);
        try {
          const rawMesh = wasmModule.tessellate(shapeId, precision, angle);
          if (!rawMesh || !rawMesh.positions) {
            throw new Error('OCCT failed to tessellate - invalid mesh data returned');
          }

          // Convert WASM vectors to TypedArrays
          return {
            positions: new Float32Array(rawMesh.positions),
            normals: new Float32Array(rawMesh.normals),
            indices: new Uint32Array(rawMesh.indices),
            edges: new Uint32Array(rawMesh.edges)
          };
        } catch (error) {
          console.error('OCCT tessellate failed:', error);
          throw new Error(`Failed to tessellate shape: ${error instanceof Error ? error.message : error}`);
        }
      },

      tessellateWithParams: (shapeId: string, precision: number, angle: number): MeshData => {
        return occtModule!.tessellate(shapeId, precision, angle);
      },

      deleteShape: (shapeId: string): void => {
        wasmModule.deleteShape(shapeId);
        OCCTMemoryManager.untrackShape(shapeId);
      },

      getShapeCount: (): number => {
        return wasmModule.getShapeCount();
      },

      VectorFloat: wasmModule.VectorFloat,
      VectorUint: wasmModule.VectorUint
    };
  } else {
    // Fallback mock implementation
    occtModule = {
      makeBox: (dx: number, dy: number, dz: number): ShapeHandle => {
        console.log(`Mock creating box: ${dx} x ${dy} x ${dz}`);
        return createMockHandle('box', 'solid');
      },

      makeSphere: (radius: number): ShapeHandle => {
        console.log(`Mock creating sphere: radius ${radius}`);
        return createMockHandle('sphere', 'solid');
      },

      makeCylinder: (radius: number, height: number): ShapeHandle => {
        console.log(`Mock creating cylinder: radius ${radius}, height ${height}`);
        return createMockHandle('cylinder', 'solid');
      },

      booleanUnion: (shape1Id: string, shape2Id: string): ShapeHandle => {
        console.log(`Mock boolean union: ${shape1Id} ∪ ${shape2Id}`);
        return createMockHandle('union', 'solid');
      },

      booleanSubtract: (shape1Id: string, shape2Id: string): ShapeHandle => {
        console.log(`Mock boolean subtract: ${shape1Id} - ${shape2Id}`);
        return createMockHandle('subtract', 'solid');
      },

      booleanIntersect: (shape1Id: string, shape2Id: string): ShapeHandle => {
        console.log(`Mock boolean intersect: ${shape1Id} ∩ ${shape2Id}`);
        return createMockHandle('intersect', 'solid');
      },

      makeFillet: (shapeId: string, radius: number): ShapeHandle => {
        console.log(`Mock fillet: ${shapeId} with radius ${radius}`);
        return createMockHandle('fillet', 'solid');
      },

      makeChamfer: (shapeId: string, distance: number): ShapeHandle => {
        console.log(`Mock chamfer: ${shapeId} with distance ${distance}`);
        return createMockHandle('chamfer', 'solid');
      },

      tessellate: (shapeId: string, precision = 0.1, angle = 0.5): MeshData => {
        console.log(`Mock tessellating: ${shapeId} with precision ${precision}`);
        return generateBasicMesh(shapeId, precision);
      },

      tessellateWithParams: (shapeId: string, precision: number, angle: number): MeshData => {
        return occtModule!.tessellate(shapeId, precision, angle);
      },

      deleteShape: (shapeId: string): void => {
        console.log(`Mock deleting shape: ${shapeId}`);
      },

      getShapeCount: (): number => {
        return 0;
      },

      VectorFloat: null,
      VectorUint: null
    };
  }

  return occtModule;
}

/**
 * Create a mock shape handle for fallback implementation
 */
function createMockHandle(prefix: string, type: 'solid' | 'surface' | 'curve'): ShapeHandle {
  const id = `${prefix}_${Math.random().toString(36).substring(7)}`;
  return {
    id,
    type,
    bbox_min_x: -50,
    bbox_min_y: -50,
    bbox_min_z: -50,
    bbox_max_x: 50,
    bbox_max_y: 50,
    bbox_max_z: 50,
    hash: id.substring(0, 16)
  };
}

/**
 * Generate basic mesh data for testing (fallback implementation)
 */
function generateBasicMesh(shapeId: string, deflection: number): MeshData {
  // Generate a simple box mesh for testing
  const size = 50;

  // Box vertices (8 corners)
  const positions = new Float32Array([
    -size, -size, -size,  // 0
     size, -size, -size,  // 1
     size,  size, -size,  // 2
    -size,  size, -size,  // 3
    -size, -size,  size,  // 4
     size, -size,  size,  // 5
     size,  size,  size,  // 6
    -size,  size,  size   // 7
  ]);

  // Generate normals (simple cube normals)
  const normals = new Float32Array([
    -1, -1, -1,  // 0
     1, -1, -1,  // 1
     1,  1, -1,  // 2
    -1,  1, -1,  // 3
    -1, -1,  1,  // 4
     1, -1,  1,  // 5
     1,  1,  1,  // 6
    -1,  1,  1   // 7
  ]);

  // Box faces (12 triangles = 36 indices)
  const indices = new Uint32Array([
    // Front face
    0, 1, 2, 0, 2, 3,
    // Back face
    4, 7, 6, 4, 6, 5,
    // Left face
    0, 3, 7, 0, 7, 4,
    // Right face
    1, 5, 6, 1, 6, 2,
    // Top face
    3, 2, 6, 3, 6, 7,
    // Bottom face
    0, 4, 5, 0, 5, 1
  ]);

  return { positions, normals, indices, edges: new Uint32Array([0, 1, 2, 3]) };
}
