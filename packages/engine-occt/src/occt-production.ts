/**
 * Production OCCT Integration Module
 * Complete implementation with real OCCT C++ bindings
 */

import type {
  ShapeHandle,
  MeshData,
  WorkerCommand,
  WorkerResponse
} from './worker-types';

// Type definitions for the OCCT WASM module
export interface OCCTModule {
  // Primitive creation
  makeBox(dx: number, dy: number, dz: number): ShapeHandle;
  makeBoxWithOrigin(x: number, y: number, z: number, dx: number, dy: number, dz: number): ShapeHandle;
  makeSphere(radius: number): ShapeHandle;
  makeSphereWithCenter(cx: number, cy: number, cz: number, radius: number): ShapeHandle;
  makeCylinder(radius: number, height: number): ShapeHandle;
  makeCone(radius1: number, radius2: number, height: number): ShapeHandle;
  makeTorus(majorRadius: number, minorRadius: number): ShapeHandle;

  // Advanced operations
  extrude(profileId: string, dx: number, dy: number, dz: number): ShapeHandle;
  revolve(profileId: string, angle: number,
          axisX: number, axisY: number, axisZ: number,
          originX: number, originY: number, originZ: number): ShapeHandle;

  // Boolean operations
  booleanUnion(shape1Id: string, shape2Id: string): ShapeHandle;
  booleanSubtract(shape1Id: string, shape2Id: string): ShapeHandle;
  booleanIntersect(shape1Id: string, shape2Id: string): ShapeHandle;

  // Feature operations
  makeFillet(shapeId: string, radius: number): ShapeHandle;
  makeChamfer(shapeId: string, distance: number): ShapeHandle;
  makeShell(shapeId: string, thickness: number): ShapeHandle;

  // Transformation operations
  transform(shapeId: string,
           tx: number, ty: number, tz: number,
           rx: number, ry: number, rz: number,
           sx: number, sy: number, sz: number): ShapeHandle;
  copyShape(shapeId: string): ShapeHandle;

  // Tessellation
  tessellate(shapeId: string, precision?: number, angle?: number): MeshData;

  // File I/O
  importSTEP(fileData: string): ShapeHandle;
  exportSTEP(shapeId: string): string;
  exportSTL(shapeId: string, binary?: boolean): string;

  // Memory management
  deleteShape(shapeId: string): void;
  getShapeCount(): number;
  clearAllShapes(): void;

  // Status
  getStatus(): string;
  getOCCTVersion(): string;

  // Vector types
  VectorFloat: any;
  VectorUint: any;
  VectorString: any;
}

// Global module instance
let occtModule: OCCTModule | null = null;
let initializationPromise: Promise<OCCTModule> | null = null;

/**
 * Load and initialize the OCCT WASM module
 */
export async function loadOCCTProduction(): Promise<OCCTModule> {
  // Return existing module if already loaded
  if (occtModule) {
    return occtModule;
  }

  // Return existing initialization promise if in progress
  if (initializationPromise) {
    return initializationPromise;
  }

  // Start new initialization
  initializationPromise = initializeOCCT();
  return initializationPromise;
}

/**
 * Internal initialization function
 */
async function initializeOCCT(): Promise<OCCTModule> {
  try {
    console.log('[OCCT Production] Loading WASM module...');

    // Dynamic import of the compiled WASM module
    const createModule = await import('../wasm/occt.js');

    // Configure module initialization
    const moduleConfig = {
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          // Use the production WASM file
          return new URL('../wasm/occt.wasm', import.meta.url).href;
        }
        return path;
      },

      // Configure for web worker environment
      environment: 'web,worker',

      // Memory configuration
      INITIAL_MEMORY: 256 * 1024 * 1024,  // 256MB initial
      MAXIMUM_MEMORY: 2 * 1024 * 1024 * 1024,  // 2GB max
      ALLOW_MEMORY_GROWTH: true,

      // Threading configuration (if supported)
      USE_PTHREADS: typeof SharedArrayBuffer !== 'undefined',
      PTHREAD_POOL_SIZE: 4,

      // Error handling
      onAbort: (what: any) => {
        console.error('[OCCT Production] WASM abort:', what);
        throw new Error(`OCCT WASM aborted: ${what}`);
      },

      // Progress tracking
      onRuntimeInitialized: () => {
        console.log('[OCCT Production] Runtime initialized');
      },

      print: (text: string) => {
        console.log('[OCCT]', text);
      },

      printErr: (text: string) => {
        console.error('[OCCT Error]', text);
      }
    };

    // Create the module instance
    // @ts-ignore - WASM module types
    occtModule = await createModule.createOCCTModule(moduleConfig);

    if (!occtModule) {
      throw new Error('Failed to create OCCT module instance');
    }

    // Verify the module is working
    const version = occtModule.getOCCTVersion();
    const status = occtModule.getStatus();

    console.log('[OCCT Production] Module loaded successfully');
    console.log('[OCCT Production] Version:', version);
    console.log('[OCCT Production] Status:', status);

    // Run a basic test
    try {
      const testBox = occtModule.makeBox(10, 10, 10);
      if (testBox && testBox.id) {
        console.log('[OCCT Production] Test box created:', testBox.id);
        occtModule.deleteShape(testBox.id);
        console.log('[OCCT Production] Geometry operations verified ✅');
      } else {
        console.warn('[OCCT Production] Test box creation returned invalid result');
      }
    } catch (testError) {
      console.error('[OCCT Production] Test failed:', testError);
      // Don't throw - module may still be usable
    }

    return occtModule;

  } catch (error) {
    console.error('[OCCT Production] Failed to load module:', error);

    // Reset state on failure
    occtModule = null;
    initializationPromise = null;

    throw new Error(`OCCT module loading failed: ${error instanceof Error ? error.message : error}`);
  }
}

/**
 * Production-ready geometry API implementation
 */
export class OCCTProductionAPI {
  private module: OCCTModule | null = null;
  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      this.module = await loadOCCTProduction();
    } catch (error) {
      console.error('[OCCTProductionAPI] Initialization failed:', error);
      throw error;
    }
  }

  async ensureInitialized(): Promise<void> {
    await this.initPromise;
    if (!this.module) {
      throw new Error('OCCT module not initialized');
    }
  }

  /**
   * Execute a geometry command
   */
  async execute(command: WorkerCommand): Promise<WorkerResponse> {
    await this.ensureInitialized();

    if (!this.module) {
      throw new Error('OCCT module not available');
    }

    try {
      let result: any;

      switch (command.type) {
        // Primitive creation
        case 'MAKE_BOX': {
          const { width, height, depth, center } = command.params;
          if (center) {
            result = this.module.makeBoxWithOrigin(
              center[0] - width/2,
              center[1] - height/2,
              center[2] - depth/2,
              width, height, depth
            );
          } else {
            result = this.module.makeBox(width, height, depth);
          }
          break;
        }

        case 'MAKE_SPHERE': {
          const { radius, center } = command.params;
          if (center) {
            result = this.module.makeSphereWithCenter(
              center[0], center[1], center[2], radius
            );
          } else {
            result = this.module.makeSphere(radius);
          }
          break;
        }

        case 'MAKE_CYLINDER': {
          const { radius, height } = command.params;
          result = this.module.makeCylinder(radius, height);
          break;
        }

        case 'MAKE_CONE': {
          const { radius1, radius2, height } = command.params;
          result = this.module.makeCone(radius1, radius2, height);
          break;
        }

        case 'MAKE_TORUS': {
          const { majorRadius, minorRadius } = command.params;
          result = this.module.makeTorus(majorRadius, minorRadius);
          break;
        }

        // Advanced operations
        case 'EXTRUDE': {
          const { profile, direction } = command.params;
          result = this.module.extrude(
            profile,
            direction[0], direction[1], direction[2]
          );
          break;
        }

        case 'REVOLVE': {
          const { profile, angle, axis, origin } = command.params;
          result = this.module.revolve(
            profile, angle,
            axis[0], axis[1], axis[2],
            origin[0], origin[1], origin[2]
          );
          break;
        }

        // Boolean operations
        case 'BOOLEAN_UNION': {
          const { shape1, shape2 } = command.params;
          result = this.module.booleanUnion(shape1, shape2);
          break;
        }

        case 'BOOLEAN_SUBTRACT': {
          const { shape1, shape2 } = command.params;
          result = this.module.booleanSubtract(shape1, shape2);
          break;
        }

        case 'BOOLEAN_INTERSECT': {
          const { shape1, shape2 } = command.params;
          result = this.module.booleanIntersect(shape1, shape2);
          break;
        }

        // Feature operations
        case 'MAKE_FILLET': {
          const { shape, radius } = command.params;
          result = this.module.makeFillet(shape, radius);
          break;
        }

        case 'MAKE_CHAMFER': {
          const { shape, distance } = command.params;
          result = this.module.makeChamfer(shape, distance);
          break;
        }

        case 'MAKE_SHELL': {
          const { shape, thickness } = command.params;
          result = this.module.makeShell(shape, thickness);
          break;
        }

        // Transformation
        case 'TRANSFORM': {
          const { shape, translation, rotation, scale } = command.params;
          result = this.module.transform(
            shape,
            translation[0], translation[1], translation[2],
            rotation[0], rotation[1], rotation[2],
            scale[0], scale[1], scale[2]
          );
          break;
        }

        case 'COPY_SHAPE': {
          const { shape } = command.params;
          result = this.module.copyShape(shape);
          break;
        }

        // Tessellation
        case 'TESSELLATE': {
          const { shape, precision = 0.1, angle = 0.5 } = command.params;
          result = this.module.tessellate(shape, precision, angle);
          break;
        }

        // File I/O
        case 'IMPORT_STEP': {
          const { fileData } = command.params;
          result = this.module.importSTEP(fileData);
          break;
        }

        case 'EXPORT_STEP': {
          const { shape } = command.params;
          result = this.module.exportSTEP(shape);
          break;
        }

        case 'EXPORT_STL': {
          const { shape, binary = true } = command.params;
          result = this.module.exportSTL(shape, binary);
          break;
        }

        // Memory management
        case 'DELETE_SHAPE': {
          const { shape } = command.params;
          this.module.deleteShape(shape);
          result = { success: true };
          break;
        }

        case 'CLEAR_ALL': {
          this.module.clearAllShapes();
          result = { success: true };
          break;
        }

        case 'GET_STATUS': {
          result = {
            status: this.module.getStatus(),
            version: this.module.getOCCTVersion(),
            shapeCount: this.module.getShapeCount()
          };
          break;
        }

        default:
          throw new Error(`Unknown command: ${command.type}`);
      }

      return {
        id: command.id,
        type: command.type,
        result,
        success: true
      };

    } catch (error) {
      console.error('[OCCTProductionAPI] Command failed:', command.type, error);

      return {
        id: command.id,
        type: command.type,
        error: error instanceof Error ? error.message : String(error),
        success: false
      };
    }
  }

  /**
   * Get module status
   */
  getStatus(): { initialized: boolean; version?: string; shapeCount?: number } {
    if (!this.module) {
      return { initialized: false };
    }

    try {
      return {
        initialized: true,
        version: this.module.getOCCTVersion(),
        shapeCount: this.module.getShapeCount()
      };
    } catch (error) {
      return { initialized: false };
    }
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.module) {
      try {
        this.module.clearAllShapes();
      } catch (error) {
        console.error('[OCCTProductionAPI] Disposal error:', error);
      }
    }
    this.module = null;
  }
}

// Export singleton instance
export const occtProductionAPI = new OCCTProductionAPI();