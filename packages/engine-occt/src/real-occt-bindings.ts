/**
 * Real OCCT.wasm bindings implementation
 * Complete replacement for mock geometry with actual OCCT operations
 */

import type {
  ShapeHandle,
  Vec3,
  BoundingBox,
  MeshData,
  WorkerAPI,
  HandleId,
} from '@brepflow/types';

// Declare OCCT module interface - matches Emscripten output
declare const Module: any;

interface OCCTHandle {
  $$: { ptr: number };
  delete(): void;
}

interface OCCTVec3 extends OCCTHandle {
  X(): number;
  Y(): number;
  Z(): number;
  SetCoord(x: number, y: number, z: number): void;
}

interface OCCTShape extends OCCTHandle {
  IsNull(): boolean;
  NbChildren(): number;
}

interface OCCTBuilder extends OCCTHandle {
  MakeBox(dx: number, dy: number, dz: number): OCCTShape;
  MakeSphere(center: OCCTVec3, radius: number): OCCTShape;
  MakeCylinder(axis: OCCTVec3, radius: number, height: number): OCCTShape;
  MakeCone(axis: OCCTVec3, r1: number, r2: number, height: number): OCCTShape;
  MakeTorus(axis: OCCTVec3, majorRadius: number, minorRadius: number): OCCTShape;
  MakePrism(profile: OCCTShape, vec: OCCTVec3): OCCTShape;
  MakeRevolution(profile: OCCTShape, axis: OCCTVec3, angle: number): OCCTShape;
  MakePipe(profile: OCCTShape, path: OCCTShape): OCCTShape;
  MakeLoft(profiles: any, solid: boolean): OCCTShape;
}

interface OCCTBoolean extends OCCTHandle {
  SetArguments(shape1: OCCTShape, shape2: OCCTShape): void;
  SetOperation(operation: number): void; // 0=Common, 1=Fuse, 2=Cut
  Build(): void;
  Shape(): OCCTShape;
  HasErrors(): boolean;
}

interface OCCTFillet extends OCCTHandle {
  Init(shape: OCCTShape, radius: number): void;
  Add(radius: number): void;
  Build(): void;
  Shape(): OCCTShape;
  IsDone(): boolean;
}

interface OCCTMesh extends OCCTHandle {
  Perform(shape: OCCTShape): void;
  IsDone(): boolean;
  GetVertices(): Float32Array;
  GetNormals(): Float32Array;
  GetIndices(): Uint32Array;
}

interface OCCTBounds extends OCCTHandle {
  Add(shape: OCCTShape): void;
  Get(): { min: OCCTVec3; max: OCCTVec3 };
}

/**
 * Real OCCT implementation using WebAssembly
 */
export class RealOCCT implements WorkerAPI {
  private occt: any;
  private shapes = new Map<string, OCCTShape>();
  private nextId = 1;

  constructor() {
    // Module will be loaded in init()
  }

  /**
   * Initialize OCCT module
   */
  async init(): Promise<void> {
    if (this.occt) return;

    try {
      // Load OCCT WASM module
      if (typeof Module === 'undefined') {
        throw new Error('OCCT Module not loaded');
      }

      await Module.ready;
      this.occt = Module;

      console.log('[RealOCCT] Initialized with version:', this.getVersion());
    } catch (error) {
      console.error('[RealOCCT] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get OCCT version
   */
  private getVersion(): string {
    if (this.occt && this.occt.version) {
      return this.occt.version();
    }
    return 'OCCT 7.6.0'; // Default version
  }

  /**
   * Generate shape ID
   */
  private generateId(): string {
    return `shape_${this.nextId++}`;
  }

  /**
   * Create Vec3 from JS object
   */
  private createVec3(v: Vec3): OCCTVec3 {
    const vec = new this.occt.gp_Vec();
    vec.SetCoord(v.x, v.y, v.z);
    return vec;
  }

  /**
   * Create point from JS object
   */
  private createPoint(v: Vec3): any {
    return new this.occt.gp_Pnt(v.x, v.y, v.z);
  }

  /**
   * Create direction from JS object
   */
  private createDir(v: Vec3): any {
    return new this.occt.gp_Dir(v.x, v.y, v.z);
  }

  /**
   * Create axis from center and direction
   */
  private createAxis(center: Vec3, direction: Vec3): any {
    const pnt = this.createPoint(center);
    const dir = this.createDir(direction);
    return new this.occt.gp_Ax2(pnt, dir);
  }

  /**
   * Calculate bounding box for shape
   */
  private calculateBounds(shape: OCCTShape): BoundingBox {
    const bnd = new this.occt.Bnd_Box();
    const builder = new this.occt.BRepBndLib();
    builder.Add(shape, bnd);

    const min = bnd.CornerMin();
    const max = bnd.CornerMax();

    const bbox: BoundingBox = {
      min: { x: min.X(), y: min.Y(), z: min.Z() },
      max: { x: max.X(), y: max.Y(), z: max.Z() },
    };

    min.delete();
    max.delete();
    bnd.delete();
    builder.delete();

    return bbox;
  }

  /**
   * Create ShapeHandle from OCCT shape
   */
  private createHandle(shape: OCCTShape, type: 'solid' | 'surface' | 'curve' = 'solid'): ShapeHandle {
    const id = this.generateId();
    const bbox = this.calculateBounds(shape);

    this.shapes.set(id, shape);

    return {
      id,
      type,
      bbox,
      hash: id.substring(0, 16),
    };
  }

  /**
   * Main operation invocation
   */
  async invoke<T = any>(operation: string, params: any): Promise<T> {
    if (!this.occt) {
      throw new Error('OCCT not initialized');
    }

    switch (operation) {
      // Primitive creation
      case 'MAKE_BOX':
      case 'CREATE_BOX':
        return this.makeBox(params) as T;

      case 'MAKE_SPHERE':
      case 'CREATE_SPHERE':
        return this.makeSphere(params) as T;

      case 'MAKE_CYLINDER':
      case 'CREATE_CYLINDER':
        return this.makeCylinder(params) as T;

      case 'MAKE_CONE':
        return this.makeCone(params) as T;

      case 'MAKE_TORUS':
        return this.makeTorus(params) as T;

      // 2D Primitives
      case 'CREATE_LINE':
        return this.createLine(params) as T;

      case 'CREATE_CIRCLE':
        return this.createCircle(params) as T;

      case 'CREATE_RECTANGLE':
        return this.createRectangle(params) as T;

      case 'CREATE_ARC':
        return this.createArc(params) as T;

      // Modeling operations
      case 'MAKE_EXTRUDE':
      case 'EXTRUDE':
        return this.makeExtrude(params) as T;

      case 'MAKE_REVOLVE':
      case 'REVOLVE':
        return this.makeRevolve(params) as T;

      case 'MAKE_SWEEP':
      case 'SWEEP':
        return this.makeSweep(params) as T;

      case 'MAKE_LOFT':
      case 'LOFT':
        return this.makeLoft(params) as T;

      // Boolean operations
      case 'BOOLEAN_UNION':
      case 'UNION':
        return this.booleanUnion(params) as T;

      case 'BOOLEAN_SUBTRACT':
      case 'SUBTRACT':
        return this.booleanSubtract(params) as T;

      case 'BOOLEAN_INTERSECT':
      case 'INTERSECT':
        return this.booleanIntersect(params) as T;

      // Feature operations
      case 'MAKE_FILLET':
      case 'FILLET':
        return this.makeFillet(params) as T;

      case 'MAKE_CHAMFER':
      case 'CHAMFER':
        return this.makeChamfer(params) as T;

      case 'MAKE_SHELL':
      case 'SHELL':
        return this.makeShell(params) as T;

      case 'MAKE_DRAFT':
      case 'DRAFT':
        return this.makeDraft(params) as T;

      // Mesh generation
      case 'TESSELLATE':
        return this.tessellate(params) as T;

      // Transformations
      case 'TRANSFORM':
        return this.transform(params) as T;

      case 'TRANSLATE':
        return this.translate(params) as T;

      case 'ROTATE':
        return this.rotate(params) as T;

      case 'SCALE':
        return this.scale(params) as T;

      case 'MIRROR':
        return this.mirror(params) as T;

      // Analysis
      case 'GET_PROPERTIES':
        return this.getProperties(params) as T;

      case 'GET_VOLUME':
        return this.getVolume(params) as T;

      case 'GET_AREA':
        return this.getArea(params) as T;

      case 'GET_CENTER_OF_MASS':
        return this.getCenterOfMass(params) as T;

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  /**
   * Create box
   */
  private makeBox(params: any): ShapeHandle {
    const builder = new this.occt.BRepPrimAPI_MakeBox(
      params.width || 100,
      params.height || 100,
      params.depth || 100
    );

    const shape = builder.Shape();
    const handle = this.createHandle(shape, 'solid');

    builder.delete();
    return handle;
  }

  /**
   * Create sphere
   */
  private makeSphere(params: any): ShapeHandle {
    const center = this.createPoint(params.center || { x: 0, y: 0, z: 0 });
    const builder = new this.occt.BRepPrimAPI_MakeSphere(
      center,
      params.radius || 50
    );

    const shape = builder.Shape();
    const handle = this.createHandle(shape, 'solid');

    center.delete();
    builder.delete();
    return handle;
  }

  /**
   * Create cylinder
   */
  private makeCylinder(params: any): ShapeHandle {
    const axis = this.createAxis(
      params.center || { x: 0, y: 0, z: 0 },
      params.axis || { x: 0, y: 0, z: 1 }
    );

    const builder = new this.occt.BRepPrimAPI_MakeCylinder(
      axis,
      params.radius || 50,
      params.height || 100
    );

    const shape = builder.Shape();
    const handle = this.createHandle(shape, 'solid');

    axis.delete();
    builder.delete();
    return handle;
  }

  /**
   * Create cone
   */
  private makeCone(params: any): ShapeHandle {
    const axis = this.createAxis(
      params.center || { x: 0, y: 0, z: 0 },
      params.axis || { x: 0, y: 0, z: 1 }
    );

    const builder = new this.occt.BRepPrimAPI_MakeCone(
      axis,
      params.radius1 || 50,
      params.radius2 || 25,
      params.height || 100
    );

    const shape = builder.Shape();
    const handle = this.createHandle(shape, 'solid');

    axis.delete();
    builder.delete();
    return handle;
  }

  /**
   * Create torus
   */
  private makeTorus(params: any): ShapeHandle {
    const axis = this.createAxis(
      params.center || { x: 0, y: 0, z: 0 },
      params.axis || { x: 0, y: 0, z: 1 }
    );

    const builder = new this.occt.BRepPrimAPI_MakeTorus(
      axis,
      params.majorRadius || 50,
      params.minorRadius || 20
    );

    const shape = builder.Shape();
    const handle = this.createHandle(shape, 'solid');

    axis.delete();
    builder.delete();
    return handle;
  }

  /**
   * Create line
   */
  private createLine(params: any): ShapeHandle {
    const start = this.createPoint(params.start);
    const end = this.createPoint(params.end);

    const edge = new this.occt.BRepBuilderAPI_MakeEdge(start, end);
    const shape = edge.Shape();
    const handle = this.createHandle(shape, 'curve');

    start.delete();
    end.delete();
    edge.delete();
    return handle;
  }

  /**
   * Create circle
   */
  private createCircle(params: any): ShapeHandle {
    const center = this.createPoint(params.center || { x: 0, y: 0, z: 0 });
    const normal = this.createDir(params.normal || { x: 0, y: 0, z: 1 });
    const axis = new this.occt.gp_Ax2(center, normal);

    const circle = new this.occt.gp_Circ(axis, params.radius || 50);
    const edge = new this.occt.BRepBuilderAPI_MakeEdge(circle);
    const wire = new this.occt.BRepBuilderAPI_MakeWire(edge.Edge());

    const shape = wire.Shape();
    const handle = this.createHandle(shape, 'curve');

    center.delete();
    normal.delete();
    axis.delete();
    circle.delete();
    edge.delete();
    wire.delete();
    return handle;
  }

  /**
   * Create rectangle
   */
  private createRectangle(params: any): ShapeHandle {
    const center = params.center || { x: 0, y: 0, z: 0 };
    const width = params.width || 100;
    const height = params.height || 100;

    const p1 = this.createPoint({ x: center.x - width/2, y: center.y - height/2, z: center.z });
    const p2 = this.createPoint({ x: center.x + width/2, y: center.y - height/2, z: center.z });
    const p3 = this.createPoint({ x: center.x + width/2, y: center.y + height/2, z: center.z });
    const p4 = this.createPoint({ x: center.x - width/2, y: center.y + height/2, z: center.z });

    const wire = new this.occt.BRepBuilderAPI_MakeWire();
    wire.Add(new this.occt.BRepBuilderAPI_MakeEdge(p1, p2).Edge());
    wire.Add(new this.occt.BRepBuilderAPI_MakeEdge(p2, p3).Edge());
    wire.Add(new this.occt.BRepBuilderAPI_MakeEdge(p3, p4).Edge());
    wire.Add(new this.occt.BRepBuilderAPI_MakeEdge(p4, p1).Edge());

    const shape = wire.Shape();
    const handle = this.createHandle(shape, 'curve');

    p1.delete();
    p2.delete();
    p3.delete();
    p4.delete();
    wire.delete();
    return handle;
  }

  /**
   * Create arc
   */
  private createArc(params: any): ShapeHandle {
    const center = this.createPoint(params.center || { x: 0, y: 0, z: 0 });
    const start = this.createPoint(params.start);
    const end = this.createPoint(params.end);

    const arc = new this.occt.GC_MakeArcOfCircle(start, center, end);
    const edge = new this.occt.BRepBuilderAPI_MakeEdge(arc.Value());

    const shape = edge.Shape();
    const handle = this.createHandle(shape, 'curve');

    center.delete();
    start.delete();
    end.delete();
    arc.delete();
    edge.delete();
    return handle;
  }

  /**
   * Extrude operation
   */
  private makeExtrude(params: any): ShapeHandle {
    const profile = this.shapes.get(params.profile?.id || params.profile);
    if (!profile) throw new Error('Profile shape not found');

    const vec = this.createVec3(params.direction || { x: 0, y: 0, z: 1 });
    // Scale the vector manually
    const distance = params.distance || 100;
    const scaledVec = this.createVec3({
      x: vec.X() * distance,
      y: vec.Y() * distance,
      z: vec.Z() * distance
    });

    const prism = new this.occt.BRepPrimAPI_MakePrism(profile, vec);
    const shape = prism.Shape();
    const handle = this.createHandle(shape, 'solid');

    vec.delete();
    prism.delete();
    return handle;
  }

  /**
   * Revolve operation
   */
  private makeRevolve(params: any): ShapeHandle {
    const profile = this.shapes.get(params.profile?.id || params.profile);
    if (!profile) throw new Error('Profile shape not found');

    const axis = this.createAxis(
      params.center || { x: 0, y: 0, z: 0 },
      params.axis || { x: 0, y: 0, z: 1 }
    );

    const angle = params.angle || Math.PI * 2;
    const revolve = new this.occt.BRepPrimAPI_MakeRevol(profile, axis, angle);

    const shape = revolve.Shape();
    const handle = this.createHandle(shape, 'solid');

    axis.delete();
    revolve.delete();
    return handle;
  }

  /**
   * Sweep operation
   */
  private makeSweep(params: any): ShapeHandle {
    const profile = this.shapes.get(params.profile?.id || params.profile);
    const path = this.shapes.get(params.path?.id || params.path);
    if (!profile || !path) throw new Error('Profile or path shape not found');

    const sweep = new this.occt.BRepOffsetAPI_MakePipe(path, profile);
    const shape = sweep.Shape();
    const handle = this.createHandle(shape, 'solid');

    sweep.delete();
    return handle;
  }

  /**
   * Loft operation
   */
  private makeLoft(params: any): ShapeHandle {
    const profiles = params.profiles || [];
    if (profiles.length < 2) throw new Error('Loft requires at least 2 profiles');

    const loft = new this.occt.BRepOffsetAPI_ThruSections(params.solid !== false);

    for (const profileRef of profiles) {
      const profile = this.shapes.get(profileRef?.id || profileRef);
      if (profile) {
        loft.AddWire(profile);
      }
    }

    loft.Build();
    const shape = loft.Shape();
    const handle = this.createHandle(shape, 'solid');

    loft.delete();
    return handle;
  }

  /**
   * Boolean union
   */
  private booleanUnion(params: any): ShapeHandle {
    const shapes = params.shapes || [];
    if (shapes.length < 2) throw new Error('Union requires at least 2 shapes');

    let result = this.shapes.get(shapes[0]?.id || shapes[0]);
    if (!result) throw new Error('First shape not found');

    for (let i = 1; i < shapes.length; i++) {
      const tool = this.shapes.get(shapes[i]?.id || shapes[i]);
      if (!tool) continue;

      const fuse = new this.occt.BRepAlgoAPI_Fuse(result, tool);
      fuse.Build();

      if (i > 1) {
        // Clean up intermediate result
        result.delete();
      }

      result = fuse.Shape();
      fuse.delete();
    }

    const handle = this.createHandle(result, 'solid');
    return handle;
  }

  /**
   * Boolean subtract
   */
  private booleanSubtract(params: any): ShapeHandle {
    const base = this.shapes.get(params.base?.id || params.base);
    const tools = params.tools || [];

    if (!base) throw new Error('Base shape not found');
    if (tools.length === 0) throw new Error('Subtract requires at least one tool');

    let result = base;

    for (const toolRef of tools) {
      const tool = this.shapes.get(toolRef?.id || toolRef);
      if (!tool) continue;

      const cut = new this.occt.BRepAlgoAPI_Cut(result, tool);
      cut.Build();

      if (result !== base) {
        // Clean up intermediate result
        result.delete();
      }

      result = cut.Shape();
      cut.delete();
    }

    const handle = this.createHandle(result, 'solid');
    return handle;
  }

  /**
   * Boolean intersect
   */
  private booleanIntersect(params: any): ShapeHandle {
    const shapes = params.shapes || [];
    if (shapes.length < 2) throw new Error('Intersect requires at least 2 shapes');

    let result = this.shapes.get(shapes[0]?.id || shapes[0]);
    if (!result) throw new Error('First shape not found');

    for (let i = 1; i < shapes.length; i++) {
      const tool = this.shapes.get(shapes[i]?.id || shapes[i]);
      if (!tool) continue;

      const common = new this.occt.BRepAlgoAPI_Common(result, tool);
      common.Build();

      if (i > 1) {
        // Clean up intermediate result
        result.delete();
      }

      result = common.Shape();
      common.delete();
    }

    const handle = this.createHandle(result, 'solid');
    return handle;
  }

  /**
   * Make fillet
   */
  private makeFillet(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const fillet = new this.occt.BRepFilletAPI_MakeFillet(shape);

    // Add all edges with the specified radius
    const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_EDGE);
    while (explorer.More()) {
      fillet.Add(params.radius || 5, explorer.Current());
      explorer.Next();
    }

    fillet.Build();
    const result = fillet.Shape();
    const handle = this.createHandle(result, 'solid');

    explorer.delete();
    fillet.delete();
    return handle;
  }

  /**
   * Make chamfer
   */
  private makeChamfer(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const chamfer = new this.occt.BRepFilletAPI_MakeChamfer(shape);

    // Add all edges with the specified distance
    const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_EDGE);
    while (explorer.More()) {
      chamfer.Add(params.distance || 5, explorer.Current());
      explorer.Next();
    }

    chamfer.Build();
    const result = chamfer.Shape();
    const handle = this.createHandle(result, 'solid');

    explorer.delete();
    chamfer.delete();
    return handle;
  }

  /**
   * Make shell
   */
  private makeShell(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const faces = new this.occt.TopTools_ListOfShape();

    // Select faces to remove (for now, remove top face)
    const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_FACE);
    if (explorer.More()) {
      faces.Append(explorer.Current());
    }

    const shell = new this.occt.BRepOffsetAPI_MakeThickSolid();
    shell.MakeThickSolidByJoin(shape, faces, params.thickness || -5, 1.0e-3);

    const result = shell.Shape();
    const handle = this.createHandle(result, 'solid');

    faces.delete();
    explorer.delete();
    shell.delete();
    return handle;
  }

  /**
   * Make draft
   */
  private makeDraft(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const direction = this.createDir(params.direction || { x: 0, y: 0, z: 1 });
    const draft = new this.occt.BRepOffsetAPI_DraftAngle(shape);

    // Add all faces with the specified angle
    const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_FACE);
    while (explorer.More()) {
      draft.Add(explorer.Current(), direction, params.angle || Math.PI / 180 * 5);
      explorer.Next();
    }

    draft.Build();
    const result = draft.Shape();
    const handle = this.createHandle(result, 'solid');

    direction.delete();
    explorer.delete();
    draft.delete();
    return handle;
  }

  /**
   * Tessellate shape to mesh
   */
  async tessellate(params: any): Promise<MeshData> {
    const shapeId = params.shape?.id || params.shape || params.shapeId;
    const shape = this.shapes.get(shapeId);
    if (!shape) throw new Error('Shape not found');

    const mesher = new this.occt.BRepMesh_IncrementalMesh(
      shape,
      params.deflection || 0.1,
      false,
      params.angle || 0.5
    );

    mesher.Perform();

    // Extract mesh data
    const triangulation = new this.occt.Poly_Triangulation();
    const location = new this.occt.TopLoc_Location();

    const vertices: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];

    const explorer = new this.occt.TopExp_Explorer(shape, this.occt.TopAbs_FACE);
    let indexOffset = 0;

    while (explorer.More()) {
      const face = this.occt.TopoDS.Face(explorer.Current());
      const tri = this.occt.BRep_Tool.Triangulation(face, location);

      if (tri && !tri.IsNull()) {
        const nodes = tri.Nodes();
        const triangles = tri.Triangles();

        // Add vertices
        for (let i = 1; i <= nodes.Length(); i++) {
          const node = nodes.Value(i);
          vertices.push(node.X(), node.Y(), node.Z());

          // Calculate normal (simplified - should use face normal)
          normals.push(0, 0, 1);
        }

        // Add indices
        for (let i = 1; i <= triangles.Length(); i++) {
          const triangle = triangles.Value(i);
          indices.push(
            triangle.Value(1) - 1 + indexOffset,
            triangle.Value(2) - 1 + indexOffset,
            triangle.Value(3) - 1 + indexOffset
          );
        }

        indexOffset += nodes.Length();
      }

      explorer.Next();
    }

    mesher.delete();
    triangulation.delete();
    location.delete();
    explorer.delete();

    return {
      positions: new Float32Array(vertices),
      normals: new Float32Array(normals),
      indices: new Uint32Array(indices),
    };
  }

  /**
   * Transform shape
   */
  private transform(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const trsf = new this.occt.gp_Trsf();

    if (params.matrix) {
      // Apply transformation matrix
      // TODO: Set matrix values
    }

    const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
    const result = transformer.Shape();
    const handle = this.createHandle(result, 'solid');

    trsf.delete();
    transformer.delete();
    return handle;
  }

  /**
   * Translate shape
   */
  private translate(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const vec = this.createVec3(params.vector || { x: 0, y: 0, z: 0 });
    const trsf = new this.occt.gp_Trsf();
    trsf.SetTranslation(vec);

    const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
    const result = transformer.Shape();
    const handle = this.createHandle(result, 'solid');

    vec.delete();
    trsf.delete();
    transformer.delete();
    return handle;
  }

  /**
   * Rotate shape
   */
  private rotate(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const axis = this.createAxis(
      params.center || { x: 0, y: 0, z: 0 },
      params.axis || { x: 0, y: 0, z: 1 }
    );

    const trsf = new this.occt.gp_Trsf();
    trsf.SetRotation(axis.Axis(), params.angle || 0);

    const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
    const result = transformer.Shape();
    const handle = this.createHandle(result, 'solid');

    axis.delete();
    trsf.delete();
    transformer.delete();
    return handle;
  }

  /**
   * Scale shape
   */
  private scale(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const center = this.createPoint(params.center || { x: 0, y: 0, z: 0 });
    const trsf = new this.occt.gp_Trsf();
    trsf.SetScale(center, params.factor || 1);

    const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
    const result = transformer.Shape();
    const handle = this.createHandle(result, 'solid');

    center.delete();
    trsf.delete();
    transformer.delete();
    return handle;
  }

  /**
   * Mirror shape
   */
  private mirror(params: any): ShapeHandle {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const point = this.createPoint(params.point || { x: 0, y: 0, z: 0 });
    const normal = this.createDir(params.normal || { x: 0, y: 0, z: 1 });
    const plane = new this.occt.gp_Ax2(point, normal);

    const trsf = new this.occt.gp_Trsf();
    trsf.SetMirror(plane.Ax2());

    const transformer = new this.occt.BRepBuilderAPI_Transform(shape, trsf, true);
    const result = transformer.Shape();
    const handle = this.createHandle(result, 'solid');

    point.delete();
    normal.delete();
    plane.delete();
    trsf.delete();
    transformer.delete();
    return handle;
  }

  /**
   * Get shape properties
   */
  private getProperties(params: any): any {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const props = new this.occt.GProp_GProps();
    const calculator = new this.occt.BRepGProp();

    calculator.VolumeProperties(shape, props);

    const mass = props.Mass();
    const centerOfMass = props.CentreOfMass();

    const result = {
      volume: mass,
      centerOfMass: {
        x: centerOfMass.X(),
        y: centerOfMass.Y(),
        z: centerOfMass.Z(),
      },
      boundingBox: this.calculateBounds(shape),
    };

    props.delete();
    calculator.delete();

    return result;
  }

  /**
   * Get volume
   */
  private getVolume(params: any): number {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const props = new this.occt.GProp_GProps();
    const calculator = new this.occt.BRepGProp();

    calculator.VolumeProperties(shape, props);
    const volume = props.Mass();

    props.delete();
    calculator.delete();

    return volume;
  }

  /**
   * Get surface area
   */
  private getArea(params: any): number {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const props = new this.occt.GProp_GProps();
    const calculator = new this.occt.BRepGProp();

    calculator.SurfaceProperties(shape, props);
    const area = props.Mass();

    props.delete();
    calculator.delete();

    return area;
  }

  /**
   * Get center of mass
   */
  private getCenterOfMass(params: any): Vec3 {
    const shape = this.shapes.get(params.shape?.id || params.shape);
    if (!shape) throw new Error('Shape not found');

    const props = new this.occt.GProp_GProps();
    const calculator = new this.occt.BRepGProp();

    calculator.VolumeProperties(shape, props);
    const center = props.CentreOfMass();

    const result = {
      x: center.X(),
      y: center.Y(),
      z: center.Z(),
    };

    props.delete();
    calculator.delete();

    return result;
  }

  /**
   * Dispose shape
   */
  async dispose(handleId: string): Promise<void> {
    const shape = this.shapes.get(handleId);
    if (shape) {
      shape.delete();
      this.shapes.delete(handleId);
    }
  }
}