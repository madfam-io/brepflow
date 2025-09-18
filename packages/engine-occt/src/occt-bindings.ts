// OCCT.wasm TypeScript Bindings
// Real OCCT integration with WebAssembly

export interface OCCTModule {
  // Geometry operations
  makeBox(dx: number, dy: number, dz: number): ShapeHandle;
  makeBoxWithOrigin(x: number, y: number, z: number, dx: number, dy: number, dz: number): ShapeHandle;
  makeSphere(radius: number): ShapeHandle;
  makeSphereWithCenter(cx: number, cy: number, cz: number, radius: number): ShapeHandle;
  makeCylinder(radius: number, height: number): ShapeHandle;
  makeCone(radius1: number, radius2: number, height: number): ShapeHandle;
  makeTorus(majorRadius: number, minorRadius: number): ShapeHandle;

  // Advanced operations
  extrude(profileId: string, dx: number, dy: number, dz: number): ShapeHandle;
  revolve(profileId: string, angle: number, axisX: number, axisY: number, axisZ: number, originX: number, originY: number, originZ: number): ShapeHandle;

  // Boolean operations
  booleanUnion(shape1Id: string, shape2Id: string): ShapeHandle;
  booleanSubtract(shape1Id: string, shape2Id: string): ShapeHandle;
  booleanIntersect(shape1Id: string, shape2Id: string): ShapeHandle;

  // Feature operations
  makeFillet(shapeId: string, radius: number): ShapeHandle;
  makeChamfer(shapeId: string, distance: number): ShapeHandle;
  makeShell(shapeId: string, thickness: number): ShapeHandle;

  // Transformation operations
  transform(shapeId: string, tx: number, ty: number, tz: number, rx: number, ry: number, rz: number, sx: number, sy: number, sz: number): ShapeHandle;
  copyShape(shapeId: string): ShapeHandle;

  // Tessellation
  tessellate(shapeId: string, precision?: number, angle?: number): MeshData;
  tessellateWithParams(shapeId: string, precision: number, angle: number): MeshData;

  // File I/O operations
  importSTEP(fileData: string): ShapeHandle;
  exportSTEP(shapeId: string): string;
  exportSTL(shapeId: string, binary?: boolean): string;

  // Memory management
  deleteShape(shapeId: string): void;
  getShapeCount(): number;
  clearAllShapes(): void;

  // Status and version
  getStatus(): string;
  getOCCTVersion(): string;

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
  volume?: number;
  area?: number;
  centerX?: number;
  centerY?: number;
  centerZ?: number;
}

export interface MeshData {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
  edges: Uint32Array;
  uvs?: Float32Array;
  vertexCount?: number;
  triangleCount?: number;
  edgeCount?: number;
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
    if (typeof window !== 'undefined') {
      console.log('[OCCT] Attempting to load real WASM module...');

      try {
        // Try the core OCCT module first (real geometry)
        const wasmModuleFactory = (await import('../wasm/occt-core.js')).default;

        // Initialize the module with proper file location
        wasmModule = await wasmModuleFactory({
          locateFile: (path: string) => {
            if (path.endsWith('.wasm')) {
              // Try multiple paths for WASM file
              const possiblePaths = [
                // Production path (copied by Vite plugin)
                new URL('/wasm/occt-core.wasm', window.location.origin).href,
                // Vite dev server path
                new URL('../wasm/occt-core.wasm', import.meta.url).href,
                // Fallback to assets (Vite production build)
                new URL('/assets/occt-core.wasm', window.location.origin).href,
              ];
              
              // Return the first path (production takes precedence)
              console.log('[OCCT] Attempting WASM load from:', possiblePaths[0]);
              return possiblePaths[0];
            }
            return path;
          }
        });

        // Test the module to ensure it's working
        if (wasmModule) {
          const status = wasmModule.getStatus?.();
          const version = wasmModule.getOCCTVersion?.() || 'OCCT-7.8.0';
          console.log('[OCCT] Core WASM module loaded successfully');
          console.log('[OCCT] Status:', status);
          console.log('[OCCT] Version:', version);

          // Test a basic operation
          try {
            const testBox = wasmModule.makeBox(1, 1, 1);
            console.log('[OCCT] Test box created:', testBox);
            wasmModule.deleteShape(testBox.id);
            console.log('[OCCT] Real geometry operations verified');
          } catch (e) {
            console.warn('[OCCT] Basic geometry test failed:', e);
          }

          wasmLoaded = true;
        }
      } catch (coreError) {
        console.warn('[OCCT] Core WASM module failed, trying simplified version:', coreError);

        try {
          // Fallback to simplified module
          const wasmModuleFactory = (await import('../wasm/occt.js')).default;
          wasmModule = await wasmModuleFactory({
            locateFile: (path: string) => {
              if (path.endsWith('.wasm')) {
                // Try multiple paths for WASM file
                const possiblePaths = [
                  new URL('/wasm/occt.wasm', window.location.origin).href,
                  new URL('../wasm/occt.wasm', import.meta.url).href,
                  new URL('/assets/occt.wasm', window.location.origin).href,
                ];
                console.log('[OCCT] Fallback WASM load from:', possiblePaths[0]);
                return possiblePaths[0];
              }
              return path;
            }
          });

          if (wasmModule) {
            console.log('[OCCT] Simplified WASM module loaded as fallback');
            wasmLoaded = true;
          }
        } catch (fallbackError) {
          console.warn('[OCCT] All WASM modules failed:', fallbackError);
          throw fallbackError;
        }
      }
    } else {
      // Node.js environment
      throw new Error('WASM loading not supported in Node.js environment');
    }
  } catch (error: unknown) {
    // This catch handles both import failures and WASM initialization failures
    console.warn('[OCCT] Failed to load real WASM module, falling back to mock implementation');
    console.log('[OCCT] Error details:', error);
    console.log('[OCCT] Note: Real WASM requires COOP/COEP headers for SharedArrayBuffer support');
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

      makeCone: (radius1: number, radius2: number, height: number): ShapeHandle => {
        console.log(`Creating OCCT cone: r1=${radius1}, r2=${radius2}, h=${height}`);
        try {
          const shape = wasmModule.makeCone(radius1, radius2, height);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create cone - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeCone failed:', error);
          throw new Error(`Failed to create cone: ${error instanceof Error ? error.message : error}`);
        }
      },

      makeTorus: (majorRadius: number, minorRadius: number): ShapeHandle => {
        console.log(`Creating OCCT torus: major=${majorRadius}, minor=${minorRadius}`);
        try {
          const shape = wasmModule.makeTorus(majorRadius, minorRadius);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create torus - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeTorus failed:', error);
          throw new Error(`Failed to create torus: ${error instanceof Error ? error.message : error}`);
        }
      },

      makeBoxWithOrigin: (x: number, y: number, z: number, dx: number, dy: number, dz: number): ShapeHandle => {
        console.log(`Creating OCCT box with origin: (${x},${y},${z}) size ${dx}x${dy}x${dz}`);
        try {
          const shape = wasmModule.makeBoxWithOrigin(x, y, z, dx, dy, dz);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create box with origin - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeBoxWithOrigin failed:', error);
          throw new Error(`Failed to create box with origin: ${error instanceof Error ? error.message : error}`);
        }
      },

      makeSphereWithCenter: (cx: number, cy: number, cz: number, radius: number): ShapeHandle => {
        console.log(`Creating OCCT sphere with center: (${cx},${cy},${cz}) radius ${radius}`);
        try {
          const shape = wasmModule.makeSphereWithCenter(cx, cy, cz, radius);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create sphere with center - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeSphereWithCenter failed:', error);
          throw new Error(`Failed to create sphere with center: ${error instanceof Error ? error.message : error}`);
        }
      },

      extrude: (profileId: string, dx: number, dy: number, dz: number): ShapeHandle => {
        console.log(`OCCT extrude: ${profileId} by vector (${dx},${dy},${dz})`);
        try {
          const shape = wasmModule.extrude(profileId, dx, dy, dz);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to extrude - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT extrude failed:', error);
          throw new Error(`Failed to extrude: ${error instanceof Error ? error.message : error}`);
        }
      },

      revolve: (profileId: string, angle: number, axisX: number, axisY: number, axisZ: number, originX: number, originY: number, originZ: number): ShapeHandle => {
        console.log(`OCCT revolve: ${profileId} by ${angle} around axis (${axisX},${axisY},${axisZ}) origin (${originX},${originY},${originZ})`);
        try {
          const shape = wasmModule.revolve(profileId, angle, axisX, axisY, axisZ, originX, originY, originZ);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to revolve - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT revolve failed:', error);
          throw new Error(`Failed to revolve: ${error instanceof Error ? error.message : error}`);
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

      makeShell: (shapeId: string, thickness: number): ShapeHandle => {
        console.log(`OCCT shell: ${shapeId} with thickness ${thickness}`);
        try {
          const shape = wasmModule.makeShell(shapeId, thickness);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to create shell - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT makeShell failed:', error);
          throw new Error(`Failed to create shell: ${error instanceof Error ? error.message : error}`);
        }
      },

      transform: (shapeId: string, tx: number, ty: number, tz: number, rx: number, ry: number, rz: number, sx: number, sy: number, sz: number): ShapeHandle => {
        console.log(`OCCT transform: ${shapeId} translate(${tx},${ty},${tz}) rotate(${rx},${ry},${rz}) scale(${sx},${sy},${sz})`);
        try {
          const shape = wasmModule.transform(shapeId, tx, ty, tz, rx, ry, rz, sx, sy, sz);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to transform - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT transform failed:', error);
          throw new Error(`Failed to transform: ${error instanceof Error ? error.message : error}`);
        }
      },

      copyShape: (shapeId: string): ShapeHandle => {
        console.log(`OCCT copy: ${shapeId}`);
        try {
          const shape = wasmModule.copyShape(shapeId);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to copy shape - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT copyShape failed:', error);
          throw new Error(`Failed to copy shape: ${error instanceof Error ? error.message : error}`);
        }
      },

      tessellate: (shapeId: string, precision = 0.1, angle = 0.5): MeshData => {
        console.log(`OCCT tessellating: ${shapeId} with precision ${precision}`);
        try {
          const rawMesh = wasmModule.tessellate(shapeId, precision, angle);
          if (!rawMesh || !rawMesh.positions) {
            throw new Error('OCCT failed to tessellate - invalid mesh data returned');
          }

          // Convert WASM vectors to TypedArrays with enhanced data
          return {
            positions: new Float32Array(rawMesh.positions),
            normals: new Float32Array(rawMesh.normals),
            indices: new Uint32Array(rawMesh.indices),
            edges: new Uint32Array(rawMesh.edges),
            uvs: rawMesh.uvs ? new Float32Array(rawMesh.uvs) : undefined,
            vertexCount: rawMesh.vertexCount,
            triangleCount: rawMesh.triangleCount,
            edgeCount: rawMesh.edgeCount
          };
        } catch (error) {
          console.error('OCCT tessellate failed:', error);
          throw new Error(`Failed to tessellate shape: ${error instanceof Error ? error.message : error}`);
        }
      },

      tessellateWithParams: (shapeId: string, precision: number, angle: number): MeshData => {
        return occtModule!.tessellate(shapeId, precision, angle);
      },

      importSTEP: (fileData: string): ShapeHandle => {
        console.log(`OCCT importing STEP file: ${fileData.length} bytes`);
        try {
          const shape = wasmModule.importSTEP(fileData);
          if (!shape || !shape.id) {
            throw new Error('OCCT failed to import STEP - invalid shape returned');
          }
          OCCTMemoryManager.trackShape(shape.id);
          return shape;
        } catch (error) {
          console.error('OCCT importSTEP failed:', error);
          throw new Error(`Failed to import STEP: ${error instanceof Error ? error.message : error}`);
        }
      },

      exportSTEP: (shapeId: string): string => {
        console.log(`OCCT exporting STEP: ${shapeId}`);
        try {
          return wasmModule.exportSTEP(shapeId);
        } catch (error) {
          console.error('OCCT exportSTEP failed:', error);
          throw new Error(`Failed to export STEP: ${error instanceof Error ? error.message : error}`);
        }
      },

      exportSTL: (shapeId: string, binary = true): string => {
        console.log(`OCCT exporting STL: ${shapeId} (binary: ${binary})`);
        try {
          return wasmModule.exportSTL(shapeId, binary);
        } catch (error) {
          console.error('OCCT exportSTL failed:', error);
          throw new Error(`Failed to export STL: ${error instanceof Error ? error.message : error}`);
        }
      },

      deleteShape: (shapeId: string): void => {
        wasmModule.deleteShape(shapeId);
        OCCTMemoryManager.untrackShape(shapeId);
      },

      getShapeCount: (): number => {
        return wasmModule.getShapeCount();
      },

      clearAllShapes: (): void => {
        wasmModule.clearAllShapes();
        OCCTMemoryManager.cleanup();
      },

      getStatus: (): string => {
        return wasmModule.getStatus();
      },

      getOCCTVersion: (): string => {
        return wasmModule.getOCCTVersion();
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

      makeCone: (radius1: number, radius2: number, height: number): ShapeHandle => {
        console.log(`Mock creating cone: r1=${radius1}, r2=${radius2}, h=${height}`);
        return createMockHandle('cone', 'solid');
      },

      makeTorus: (majorRadius: number, minorRadius: number): ShapeHandle => {
        console.log(`Mock creating torus: major=${majorRadius}, minor=${minorRadius}`);
        return createMockHandle('torus', 'solid');
      },

      makeBoxWithOrigin: (x: number, y: number, z: number, dx: number, dy: number, dz: number): ShapeHandle => {
        console.log(`Mock creating box with origin: (${x},${y},${z}) size ${dx}x${dy}x${dz}`);
        return createMockHandle('box_origin', 'solid');
      },

      makeSphereWithCenter: (cx: number, cy: number, cz: number, radius: number): ShapeHandle => {
        console.log(`Mock creating sphere with center: (${cx},${cy},${cz}) radius ${radius}`);
        return createMockHandle('sphere_center', 'solid');
      },

      extrude: (profileId: string, dx: number, dy: number, dz: number): ShapeHandle => {
        console.log(`Mock extrude: ${profileId} by vector (${dx},${dy},${dz})`);
        return createMockHandle('extrude', 'solid');
      },

      revolve: (profileId: string, angle: number, axisX: number, axisY: number, axisZ: number, originX: number, originY: number, originZ: number): ShapeHandle => {
        console.log(`Mock revolve: ${profileId} by ${angle} around axis (${axisX},${axisY},${axisZ})`);
        return createMockHandle('revolve', 'solid');
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

      makeShell: (shapeId: string, thickness: number): ShapeHandle => {
        console.log(`Mock shell: ${shapeId} with thickness ${thickness}`);
        return createMockHandle('shell', 'solid');
      },

      transform: (shapeId: string, tx: number, ty: number, tz: number, rx: number, ry: number, rz: number, sx: number, sy: number, sz: number): ShapeHandle => {
        console.log(`Mock transform: ${shapeId} translate(${tx},${ty},${tz}) rotate(${rx},${ry},${rz}) scale(${sx},${sy},${sz})`);
        return createMockHandle('transformed', 'solid');
      },

      copyShape: (shapeId: string): ShapeHandle => {
        console.log(`Mock copy: ${shapeId}`);
        return createMockHandle('copy', 'solid');
      },

      tessellate: (shapeId: string, precision = 0.1, angle = 0.5): MeshData => {
        console.log(`Mock tessellating: ${shapeId} with precision ${precision}`);
        return generateBasicMesh(shapeId, precision);
      },

      tessellateWithParams: (shapeId: string, precision: number, angle: number): MeshData => {
        return occtModule!.tessellate(shapeId, precision, angle);
      },

      importSTEP: (fileData: string): ShapeHandle => {
        console.log(`Mock importing STEP file: ${fileData.length} bytes`);
        return createMockHandle('step_import', 'solid');
      },

      exportSTEP: (shapeId: string): string => {
        console.log(`Mock exporting STEP: ${shapeId}`);
        return "STEP file mock data";
      },

      exportSTL: (shapeId: string, binary = true): string => {
        console.log(`Mock exporting STL: ${shapeId} (binary: ${binary})`);
        return "STL file mock data";
      },

      deleteShape: (shapeId: string): void => {
        console.log(`Mock deleting shape: ${shapeId}`);
      },

      getShapeCount: (): number => {
        return 0;
      },

      clearAllShapes: (): void => {
        console.log(`Mock clearing all shapes`);
      },

      getStatus: (): string => {
        return "Mock OCCT implementation | Shapes: 0 | Memory: OK";
      },

      getOCCTVersion: (): string => {
        return "7.8.0-mock";
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
