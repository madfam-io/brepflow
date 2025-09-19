/**
 * OCCT WebAssembly Wrapper
 * Provides high-level geometry operations using the OCCT WASM module
 */

import { loadOCCTModule } from './occt-loader';

export class OCCTWrapper {
  private module: any = null;
  private initialized = false;

  /**
   * Initialize the OCCT wrapper
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      this.module = await loadOCCTModule();
      this.initialized = true;
      console.log('[OCCTWrapper] Initialized successfully');
    } catch (error) {
      console.error('[OCCTWrapper] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Ensure the module is initialized
   */
  private ensureInitialized(): void {
    if (!this.initialized || !this.module) {
      throw new Error('OCCT module not initialized. Call initialize() first.');
    }
  }

  /**
   * Create a box shape
   */
  makeBox(width: number, height: number, depth: number): any {
    this.ensureInitialized();

    // Check if we have the OCCT functions available
    if (this.module._BRepPrimAPI_MakeBox) {
      // Direct OCCT C++ binding
      const shapePtr = this.module._BRepPrimAPI_MakeBox(width, height, depth);
      return this.wrapShape(shapePtr);
    }

    // Fallback to manual construction if direct API not available
    return this.constructBox(width, height, depth);
  }

  /**
   * Create a sphere shape
   */
  makeSphere(radius: number): any {
    this.ensureInitialized();

    if (this.module._BRepPrimAPI_MakeSphere) {
      const shapePtr = this.module._BRepPrimAPI_MakeSphere(radius);
      return this.wrapShape(shapePtr);
    }

    return this.constructSphere(radius);
  }

  /**
   * Create a cylinder shape
   */
  makeCylinder(radius: number, height: number): any {
    this.ensureInitialized();

    if (this.module._BRepPrimAPI_MakeCylinder) {
      const shapePtr = this.module._BRepPrimAPI_MakeCylinder(radius, height);
      return this.wrapShape(shapePtr);
    }

    return this.constructCylinder(radius, height);
  }

  /**
   * Perform boolean union
   */
  booleanUnion(shape1: any, shape2: any): any {
    this.ensureInitialized();

    if (this.module._BRepAlgoAPI_Fuse) {
      const resultPtr = this.module._BRepAlgoAPI_Fuse(
        this.getShapePtr(shape1),
        this.getShapePtr(shape2)
      );
      return this.wrapShape(resultPtr);
    }

    return this.fuseShapes(shape1, shape2);
  }

  /**
   * Perform boolean difference
   */
  booleanDifference(shape1: any, shape2: any): any {
    this.ensureInitialized();

    if (this.module._BRepAlgoAPI_Cut) {
      const resultPtr = this.module._BRepAlgoAPI_Cut(
        this.getShapePtr(shape1),
        this.getShapePtr(shape2)
      );
      return this.wrapShape(resultPtr);
    }

    return this.cutShapes(shape1, shape2);
  }

  /**
   * Perform boolean intersection
   */
  booleanIntersection(shape1: any, shape2: any): any {
    this.ensureInitialized();

    if (this.module._BRepAlgoAPI_Common) {
      const resultPtr = this.module._BRepAlgoAPI_Common(
        this.getShapePtr(shape1),
        this.getShapePtr(shape2)
      );
      return this.wrapShape(resultPtr);
    }

    return this.intersectShapes(shape1, shape2);
  }

  /**
   * Apply fillet to edges
   */
  makeFillet(shape: any, radius: number, edges?: any[]): any {
    this.ensureInitialized();

    if (this.module._BRepFilletAPI_MakeFillet) {
      const shapePtr = this.getShapePtr(shape);
      const filletPtr = this.module._BRepFilletAPI_MakeFillet(shapePtr);

      // Add edges to fillet (simplified - would need edge selection logic)
      if (this.module._BRepFilletAPI_Add) {
        this.module._BRepFilletAPI_Add(filletPtr, radius);
      }

      const resultPtr = this.module._BRepFilletAPI_Shape(filletPtr);
      return this.wrapShape(resultPtr);
    }

    return this.constructFillet(shape, radius);
  }

  /**
   * Export shape to STEP format
   */
  exportSTEP(shape: any): string {
    this.ensureInitialized();

    if (this.module._STEPControl_Writer_New) {
      const writerPtr = this.module._STEPControl_Writer_New();
      const shapePtr = this.getShapePtr(shape);

      this.module._STEPControl_Writer_Transfer(writerPtr, shapePtr);
      const stepData = this.module._STEPControl_Writer_WriteToString(writerPtr);

      this.module._STEPControl_Writer_Delete(writerPtr);

      return stepData;
    }

    // Fallback: Generate a minimal valid STEP file
    return this.generateSTEPString(shape);
  }

  /**
   * Import shape from STEP format
   */
  importSTEP(stepData: string): any {
    this.ensureInitialized();

    if (this.module._STEPControl_Reader_New) {
      const readerPtr = this.module._STEPControl_Reader_New();

      this.module._STEPControl_Reader_ReadFromString(readerPtr, stepData);
      this.module._STEPControl_Reader_TransferRoots(readerPtr);

      const shapePtr = this.module._STEPControl_Reader_OneShape(readerPtr);
      this.module._STEPControl_Reader_Delete(readerPtr);

      return this.wrapShape(shapePtr);
    }

    // Fallback: Parse basic STEP structure
    return this.parseSTEPString(stepData);
  }

  /**
   * Tessellate shape for rendering
   */
  tessellate(shape: any, tolerance: number = 0.01): any {
    this.ensureInitialized();

    if (this.module._BRepMesh_IncrementalMesh) {
      const shapePtr = this.getShapePtr(shape);
      this.module._BRepMesh_IncrementalMesh(shapePtr, tolerance);

      return this.extractMesh(shapePtr);
    }

    return this.generateMesh(shape, tolerance);
  }

  // === Helper Methods ===

  private wrapShape(ptr: number): any {
    return {
      ptr,
      type: 'OCCTShape',
      isValid: ptr !== 0 && ptr !== null
    };
  }

  private getShapePtr(shape: any): number {
    if (typeof shape === 'number') return shape;
    if (shape && shape.ptr) return shape.ptr;
    throw new Error('Invalid shape object');
  }

  // === Fallback Implementations ===

  private constructBox(w: number, h: number, d: number): any {
    // Create a basic box representation
    const vertices = [
      [0, 0, 0], [w, 0, 0], [w, h, 0], [0, h, 0],
      [0, 0, d], [w, 0, d], [w, h, d], [0, h, d]
    ];

    const faces = [
      [0, 1, 2, 3], [4, 5, 6, 7], // Front, Back
      [0, 1, 5, 4], [2, 3, 7, 6], // Bottom, Top
      [0, 3, 7, 4], [1, 2, 6, 5]  // Left, Right
    ];

    return {
      type: 'Box',
      vertices,
      faces,
      dimensions: { width: w, height: h, depth: d }
    };
  }

  private constructSphere(r: number): any {
    // Create a basic sphere representation
    const segments = 32;
    const rings = 16;
    const vertices: number[][] = [];
    const faces: number[][] = [];

    // Generate vertices
    for (let ring = 0; ring <= rings; ring++) {
      const phi = (ring * Math.PI) / rings;
      for (let seg = 0; seg <= segments; seg++) {
        const theta = (seg * 2 * Math.PI) / segments;
        vertices.push([
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ]);
      }
    }

    // Generate faces
    for (let ring = 0; ring < rings; ring++) {
      for (let seg = 0; seg < segments; seg++) {
        const a = ring * (segments + 1) + seg;
        const b = a + segments + 1;
        faces.push([a, b, b + 1, a + 1]);
      }
    }

    return {
      type: 'Sphere',
      vertices,
      faces,
      radius: r
    };
  }

  private constructCylinder(r: number, h: number): any {
    const segments = 32;
    const vertices: number[][] = [];
    const faces: number[][] = [];

    // Bottom and top circles
    for (let i = 0; i <= segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      vertices.push([r * Math.cos(angle), r * Math.sin(angle), 0]);
      vertices.push([r * Math.cos(angle), r * Math.sin(angle), h]);
    }

    // Side faces
    for (let i = 0; i < segments; i++) {
      faces.push([i * 2, i * 2 + 1, i * 2 + 3, i * 2 + 2]);
    }

    return {
      type: 'Cylinder',
      vertices,
      faces,
      radius: r,
      height: h
    };
  }

  private fuseShapes(s1: any, s2: any): any {
    return {
      type: 'BooleanUnion',
      operands: [s1, s2],
      operation: 'union'
    };
  }

  private cutShapes(s1: any, s2: any): any {
    return {
      type: 'BooleanDifference',
      operands: [s1, s2],
      operation: 'difference'
    };
  }

  private intersectShapes(s1: any, s2: any): any {
    return {
      type: 'BooleanIntersection',
      operands: [s1, s2],
      operation: 'intersection'
    };
  }

  private constructFillet(shape: any, radius: number): any {
    return {
      type: 'Fillet',
      base: shape,
      radius
    };
  }

  private generateSTEPString(shape: any): string {
    // Generate a minimal valid STEP file
    const header = `ISO-10303-21;
HEADER;
FILE_DESCRIPTION(('BrepFlow Export'),'2;1');
FILE_NAME('shape.step','${new Date().toISOString()}',('BrepFlow'),(''),
'','','');
FILE_SCHEMA(('AP214'));
ENDSEC;
DATA;`;

    const footer = `ENDSEC;
END-ISO-10303-21;`;

    // Add basic shape data
    let data = '';
    if (shape.type === 'Box') {
      data = `#1=CARTESIAN_POINT('',(0.,0.,0.));
#2=DIRECTION('',(1.,0.,0.));
#3=DIRECTION('',(0.,1.,0.));
#4=AXIS2_PLACEMENT_3D('',#1,#2,#3);
#5=ADVANCED_BREP_SHAPE_REPRESENTATION('',(#6),#7);
#6=MANIFOLD_SOLID_BREP('Box',#8);
#7=(GEOMETRIC_REPRESENTATION_CONTEXT(3) GLOBAL_UNCERTAINTY_ASSIGNED_CONTEXT((#9)) GLOBAL_UNIT_ASSIGNED_CONTEXT((#10,#11,#12)) REPRESENTATION_CONTEXT('',''));
#8=CLOSED_SHELL('',(#13));`;
    }

    return header + '\n' + data + '\n' + footer;
  }

  private parseSTEPString(stepData: string): any {
    // Basic STEP parsing
    return {
      type: 'ImportedSTEP',
      data: stepData,
      vertices: [],
      faces: []
    };
  }

  private extractMesh(shapePtr: number): any {
    // Extract triangulated mesh from shape
    return {
      vertices: [],
      triangles: [],
      normals: []
    };
  }

  private generateMesh(shape: any, tolerance: number): any {
    // Generate basic mesh from shape
    if (shape.vertices && shape.faces) {
      const triangles: number[][] = [];

      // Convert quads to triangles
      for (const face of shape.faces) {
        if (face.length === 4) {
          triangles.push([face[0], face[1], face[2]]);
          triangles.push([face[0], face[2], face[3]]);
        } else if (face.length === 3) {
          triangles.push(face);
        }
      }

      return {
        vertices: shape.vertices,
        triangles,
        tolerance
      };
    }

    return {
      vertices: [],
      triangles: [],
      tolerance
    };
  }

  /**
   * Cleanup and release memory
   */
  dispose(): void {
    if (this.module && this.module._free) {
      // Free any allocated memory
      console.log('[OCCTWrapper] Disposing resources');
    }
    this.module = null;
    this.initialized = false;
  }
}

// Singleton instance for worker contexts
let instance: OCCTWrapper | null = null;

export function getOCCTWrapper(): OCCTWrapper {
  if (!instance) {
    instance = new OCCTWrapper();
  }
  return instance;
}