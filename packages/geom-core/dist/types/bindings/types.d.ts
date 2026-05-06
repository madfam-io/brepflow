/**
 * geom-core Types
 *
 * Unified type definitions for the MADFAM geometry engine.
 * Ported and extended from sim4d/engine-occt for cross-project compatibility.
 */
export interface Vec3 {
    x: number;
    y: number;
    z: number;
}
export interface BoundingBox {
    min: Vec3;
    max: Vec3;
}
export type ShapeType = "solid" | "surface" | "curve" | "point" | "compound" | "wire" | "edge" | "face" | "shell";
export interface ShapeHandle {
    id: string;
    type: ShapeType;
    bbox: BoundingBox;
    hash: string;
    volume?: number;
    surfaceArea?: number;
    centerOfMass?: Vec3;
}
export interface MeshData {
    positions: Float32Array;
    normals: Float32Array;
    indices: Uint32Array;
    uvs?: Float32Array;
}
export interface TessellateOptions {
    /** Max distance from true surface (default: 0.1) */
    deflection?: number;
    /** Angular deflection for curved surfaces (default: 0.5) */
    angle?: number;
    /** Generate smooth normals (default: true) */
    computeNormals?: boolean;
    /** Generate UV coordinates (default: false) */
    computeUVs?: boolean;
}
export interface BoxParams {
    width?: number;
    height?: number;
    depth?: number;
    center?: Vec3;
}
export interface SphereParams {
    radius?: number;
    center?: Vec3;
}
export interface CylinderParams {
    radius?: number;
    height?: number;
    center?: Vec3;
    axis?: Vec3;
}
export interface ConeParams {
    radius1?: number;
    radius2?: number;
    height?: number;
    center?: Vec3;
    axis?: Vec3;
}
export interface TorusParams {
    majorRadius?: number;
    minorRadius?: number;
    center?: Vec3;
    axis?: Vec3;
}
export interface LineParams {
    start: Vec3;
    end: Vec3;
}
export interface CircleParams {
    center?: Vec3;
    radius?: number;
    normal?: Vec3;
}
export interface RectangleParams {
    center?: Vec3;
    width?: number;
    height?: number;
}
export interface ArcParams {
    start: Vec3;
    center: Vec3;
    end: Vec3;
}
export interface PolygonParams {
    points: Vec3[];
    closed?: boolean;
}
export interface EllipseParams {
    center?: Vec3;
    majorRadius?: number;
    minorRadius?: number;
    normal?: Vec3;
}
export interface PointParams {
    x?: number;
    y?: number;
    z?: number;
}
export interface BooleanUnionParams {
    shapes: (string | ShapeHandle)[];
}
export interface BooleanSubtractParams {
    base: string | ShapeHandle;
    tools: (string | ShapeHandle)[];
}
export interface BooleanIntersectParams {
    shapes: (string | ShapeHandle)[];
}
export interface ExtrudeParams {
    profile: string | ShapeHandle;
    direction?: Vec3;
    distance?: number;
}
export interface RevolveParams {
    profile: string | ShapeHandle;
    center?: Vec3;
    axis?: Vec3;
    angle?: number;
}
export interface SweepParams {
    profile: string | ShapeHandle;
    path: string | ShapeHandle;
}
export interface LoftParams {
    profiles: (string | ShapeHandle)[];
    solid?: boolean;
}
export interface FilletParams {
    shape: string | ShapeHandle;
    radius?: number;
    edges?: string[];
}
export interface ChamferParams {
    shape: string | ShapeHandle;
    distance?: number;
    edges?: string[];
}
export interface ShellParams {
    shape: string | ShapeHandle;
    thickness?: number;
    facesToRemove?: string[];
}
export interface DraftParams {
    shape: string | ShapeHandle;
    direction?: Vec3;
    angle?: number;
}
export interface OffsetParams {
    shape: string | ShapeHandle;
    distance?: number;
    join?: "arc" | "intersection";
}
export interface TransformParams {
    shape: string | ShapeHandle;
    matrix: number[] | Matrix4x4Object;
}
export interface Matrix4x4Object {
    m11?: number;
    m12?: number;
    m13?: number;
    m14?: number;
    m21?: number;
    m22?: number;
    m23?: number;
    m24?: number;
    m31?: number;
    m32?: number;
    m33?: number;
    m34?: number;
    m41?: number;
    m42?: number;
    m43?: number;
    m44?: number;
}
export interface TranslateParams {
    shape: string | ShapeHandle;
    vector: Vec3;
}
export interface RotateParams {
    shape: string | ShapeHandle;
    center?: Vec3;
    axis?: Vec3;
    angle: number;
}
export interface ScaleParams {
    shape: string | ShapeHandle;
    center?: Vec3;
    factor: number;
}
export interface MirrorParams {
    shape: string | ShapeHandle;
    point?: Vec3;
    normal?: Vec3;
}
export interface AnalysisParams {
    shape: string | ShapeHandle;
}
export interface ShapeProperties {
    volume: number;
    surfaceArea: number;
    centerOfMass: Vec3;
    boundingBox: BoundingBox;
}
export type ImportFormat = "step" | "iges" | "brep";
export type ExportFormat = "step" | "stl" | "iges" | "obj" | "brep";
export interface ImportParams {
    data: string | ArrayBuffer;
    format: ImportFormat;
    filename?: string;
}
export interface ExportParams {
    shape: string | ShapeHandle;
    format: ExportFormat;
    options?: ExportOptions;
}
export interface ExportOptions {
    /** For STL: binary format (default: true) */
    binary?: boolean;
    /** For STL: mesh deflection (default: 0.1) */
    deflection?: number;
    /** For STEP: application name */
    applicationName?: string;
    /** For STEP: schema version */
    schemaVersion?: string;
}
export interface ImportResult {
    shapes: ShapeHandle[];
    rootShape?: ShapeHandle;
    metadata?: Record<string, unknown>;
}
export interface ExportResult {
    data: string | ArrayBuffer;
    format: ExportFormat;
    filename?: string;
}
export interface AssemblyParams {
    name?: string;
    parts?: (string | ShapeHandle)[];
    visible?: boolean;
}
export interface AssemblyHandle {
    id: string;
    name: string;
    parts: AssemblyPart[];
    mates: MateConstraint[];
    visible: boolean;
    hash: string;
}
export interface AssemblyPart {
    id: string;
    type: string;
    originalId?: string;
    transform?: PartTransform;
    patternInstance?: boolean;
}
export interface PartTransform {
    translation: Vec3;
    rotation: Vec3;
    scale: number;
}
export type MateType = "coincident" | "parallel" | "perpendicular" | "tangent" | "concentric" | "distance" | "angle";
export interface MateParams {
    assembly: string | AssemblyHandle;
    part1: string | ShapeHandle;
    part2: string | ShapeHandle;
    mateType?: MateType;
    axis1?: Vec3;
    axis2?: Vec3;
    distance?: number;
    angle?: number;
}
export interface MateConstraint {
    id: string;
    type: MateType;
    part1: string;
    part2: string;
    axis1?: Vec3;
    axis2?: Vec3;
    distance?: number;
    angle?: number;
}
export type PatternType = "linear" | "circular" | "rectangular";
export interface PatternParams {
    assembly: string | AssemblyHandle;
    part: string | ShapeHandle;
    patternType?: PatternType;
    count?: number;
    spacing?: number;
    axis?: Vec3;
    angle?: number;
}
export interface PatternResult {
    assembly: AssemblyHandle;
    instanceIds: string[];
}
export interface OperationResult<T> {
    success: boolean;
    value?: T;
    error?: {
        code: string;
        message: string;
    };
    durationMs?: number;
    memoryUsedBytes?: number;
    wasCached?: boolean;
    executedRemotely?: boolean;
}
export type ComputeLocation = "local" | "remote" | "auto";
export interface ComputeHint {
    /** Preferred execution location */
    preferLocation?: ComputeLocation;
    /** Priority (higher = more important) */
    priority?: number;
    /** Deadline in ms (for time-sensitive operations) */
    deadlineMs?: number;
    /** Whether this is a precomputation hint */
    speculative?: boolean;
}
export interface ComplexityEstimate {
    /** Complexity score 0-1 */
    score: number;
    /** Estimated duration in ms */
    estimatedMs: number;
    /** Estimated memory usage in bytes */
    estimatedBytes: number;
    /** Recommended execution location */
    recommendedLocation: ComputeLocation;
}
export interface WASMModule {
    gp_Pnt: new (x: number, y: number, z: number) => OCCTHandle;
    gp_Vec: new () => OCCTVec3;
    gp_Dir: new (x: number, y: number, z: number) => OCCTHandle;
    gp_Ax2: new (pnt: OCCTHandle, dir: OCCTHandle) => OCCTHandle;
    gp_Trsf: new () => OCCTHandle;
    gp_Circ: new (axis: OCCTHandle, radius: number) => OCCTHandle;
    gp_Elips: new (axis: OCCTHandle, major: number, minor: number) => OCCTHandle;
    BRepPrimAPI_MakeBox: new (width: number, height: number, depth: number) => OCCTBuilder;
    BRepPrimAPI_MakeSphere: new (center: OCCTHandle, radius: number) => OCCTBuilder;
    BRepPrimAPI_MakeCylinder: new (axis: OCCTHandle, radius: number, height: number) => OCCTBuilder;
    BRepPrimAPI_MakeCone: new (axis: OCCTHandle, r1: number, r2: number, height: number) => OCCTBuilder;
    BRepPrimAPI_MakeTorus: new (axis: OCCTHandle, major: number, minor: number) => OCCTBuilder;
    BRepPrimAPI_MakePrism: new (shape: OCCTShape, vec: OCCTVec3) => OCCTBuilder;
    BRepPrimAPI_MakeRevol: new (shape: OCCTShape, axis: OCCTHandle, angle: number) => OCCTBuilder;
    BRepBuilderAPI_MakeEdge: new (p1: OCCTHandle, p2: OCCTHandle) => OCCTBuilder;
    BRepBuilderAPI_MakeWire: new () => OCCTWireBuilder;
    BRepBuilderAPI_MakeVertex: new (pnt: OCCTHandle) => OCCTBuilder;
    BRepBuilderAPI_Transform: new (shape: OCCTShape, trsf: OCCTHandle, copy: boolean) => OCCTBuilder;
    BRepAlgoAPI_Fuse: new (s1: OCCTShape, s2: OCCTShape) => OCCTBuilder;
    BRepAlgoAPI_Cut: new (s1: OCCTShape, s2: OCCTShape) => OCCTBuilder;
    BRepAlgoAPI_Common: new (s1: OCCTShape, s2: OCCTShape) => OCCTBuilder;
    BRepFilletAPI_MakeFillet: new (shape: OCCTShape) => OCCTFilletBuilder;
    BRepFilletAPI_MakeChamfer: new (shape: OCCTShape) => OCCTChamferBuilder;
    BRepOffsetAPI_MakePipe: new (path: OCCTShape, profile: OCCTShape) => OCCTBuilder;
    BRepOffsetAPI_ThruSections: new (solid: boolean) => OCCTLoftBuilder;
    BRepOffsetAPI_MakeThickSolid: new () => OCCTShellBuilder;
    BRepOffsetAPI_DraftAngle: new (shape: OCCTShape) => OCCTDraftBuilder;
    BRepOffsetAPI_MakeOffsetShape: new () => OCCTOffsetBuilder;
    GC_MakeSegment: new (p1: OCCTHandle, p2: OCCTHandle) => OCCTGeomBuilder;
    GC_MakeArcOfCircle: new (p1: OCCTHandle, p2: OCCTHandle, p3: OCCTHandle) => OCCTGeomBuilder;
    GC_MakeEllipse: new (elips: OCCTHandle) => OCCTGeomBuilder;
    GProp_GProps: new () => OCCTHandle;
    BRepGProp: new () => OCCTPropsCalculator;
    Bnd_Box: new () => OCCTBndBox;
    BRepBndLib: new () => OCCTBndBuilder;
    BRepMesh_IncrementalMesh: new (shape: OCCTShape, deflection: number, relative: boolean, angle: number) => OCCTMesher;
    TopExp_Explorer: new (shape: OCCTShape, type: number) => OCCTExplorer;
    TopoDS: {
        Face: (shape: OCCTShape) => OCCTShape;
    };
    BRep_Tool: {
        Triangulation: (face: OCCTShape, loc: OCCTHandle) => OCCTTriangulation | null;
    };
    TopLoc_Location: new () => OCCTHandle;
    Poly_Triangulation: new () => OCCTTriangulation;
    TopTools_ListOfShape: new () => OCCTShapeList;
    TopAbs_FACE: number;
    TopAbs_EDGE: number;
}
export interface OCCTHandle {
    delete(): void;
    X?(): number;
    Y?(): number;
    Z?(): number;
    Axis?(): OCCTHandle;
    Ax2?(): OCCTHandle;
}
export interface OCCTVec3 extends OCCTHandle {
    SetCoord(x: number, y: number, z: number): void;
    X(): number;
    Y(): number;
    Z(): number;
}
export interface OCCTShape extends OCCTHandle {
    ShapeType(): number;
}
export interface OCCTBuilder extends OCCTHandle {
    Build(): void;
    IsDone(): boolean;
    Shape(): OCCTShape;
    Edge?(): OCCTShape;
}
export interface OCCTWireBuilder extends OCCTBuilder {
    Add(edge: OCCTShape): void;
}
export interface OCCTFilletBuilder extends OCCTBuilder {
    Add(radius: number, edge: OCCTShape): void;
}
export interface OCCTChamferBuilder extends OCCTBuilder {
    Add(distance: number, edge: OCCTShape): void;
}
export interface OCCTLoftBuilder extends OCCTBuilder {
    AddWire(wire: OCCTShape): void;
}
export interface OCCTShellBuilder extends OCCTBuilder {
    MakeThickSolidByJoin(shape: OCCTShape, faces: OCCTShapeList, thickness: number, tolerance: number): void;
}
export interface OCCTDraftBuilder extends OCCTBuilder {
    Add(face: OCCTShape, dir: OCCTHandle, angle: number): void;
}
export interface OCCTOffsetBuilder extends OCCTBuilder {
    PerformByJoin(shape: OCCTShape, distance: number, tolerance: number): void;
}
export interface OCCTGeomBuilder extends OCCTHandle {
    IsDone(): boolean;
    Value(): OCCTHandle;
}
export interface OCCTPropsCalculator extends OCCTHandle {
    VolumeProperties(shape: OCCTShape, props: OCCTHandle): void;
    SurfaceProperties(shape: OCCTShape, props: OCCTHandle): void;
}
export interface OCCTBndBox extends OCCTHandle {
    CornerMin(): OCCTHandle;
    CornerMax(): OCCTHandle;
    IsVoid(): boolean;
}
export interface OCCTBndBuilder extends OCCTHandle {
    Add(shape: OCCTShape, box: OCCTBndBox): void;
}
export interface OCCTMesher extends OCCTHandle {
    Perform(): void;
}
export interface OCCTExplorer extends OCCTHandle {
    More(): boolean;
    Next(): void;
    Current(): OCCTShape;
}
export interface OCCTTriangulation extends OCCTHandle {
    IsNull(): boolean;
    Nodes(): {
        Length(): number;
        Value(i: number): OCCTHandle;
    };
    Triangles(): {
        Length(): number;
        Value(i: number): {
            Value(i: number): number;
        };
    };
}
export interface OCCTShapeList extends OCCTHandle {
    Append(shape: OCCTShape): void;
}
export declare function createHandleId(prefix?: string): string;
export declare function resetHandleIdCounter(value?: number): void;
export declare function getShapeId(shapeOrId: string | ShapeHandle): string;
//# sourceMappingURL=types.d.ts.map