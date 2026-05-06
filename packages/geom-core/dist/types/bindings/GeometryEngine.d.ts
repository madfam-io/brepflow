/**
 * GeometryEngine - Unified OCCT Geometry Engine
 *
 * Consolidated from sim4d/engine-occt bindings for cross-project use.
 * Provides a single entry point for all geometry operations.
 *
 * @module geom-core
 */
import type { WASMModule, OCCTShape, ShapeHandle, Vec3, BoundingBox, MeshData, TessellateOptions, BoxParams, SphereParams, CylinderParams, ConeParams, TorusParams, LineParams, CircleParams, RectangleParams, ArcParams, PolygonParams, EllipseParams, PointParams, BooleanUnionParams, BooleanSubtractParams, BooleanIntersectParams, ExtrudeParams, RevolveParams, SweepParams, LoftParams, FilletParams, ChamferParams, ShellParams, DraftParams, OffsetParams, TransformParams, TranslateParams, RotateParams, ScaleParams, MirrorParams, ShapeProperties, OperationResult, ComplexityEstimate, ImportParams, ExportParams, ImportResult, ExportResult, AssemblyParams, AssemblyHandle, MateParams, PatternParams, PatternResult } from "./types";
export type { MateType, PatternType } from "./types";
export declare class GeometryEngine {
    private occt;
    private shapes;
    private idGen;
    private vec3;
    private shapeUtils;
    private logger;
    private initialized;
    constructor(occt: WASMModule);
    isInitialized(): boolean;
    getShapeCount(): number;
    getShape(id: string): OCCTShape | undefined;
    disposeShape(id: string): boolean;
    disposeAll(): void;
    makeBox(params?: BoxParams): OperationResult<ShapeHandle>;
    makeSphere(params?: SphereParams): OperationResult<ShapeHandle>;
    makeCylinder(params?: CylinderParams): OperationResult<ShapeHandle>;
    makeCone(params?: ConeParams): OperationResult<ShapeHandle>;
    makeTorus(params?: TorusParams): OperationResult<ShapeHandle>;
    createLine(params: LineParams): OperationResult<ShapeHandle>;
    createCircle(params?: CircleParams): OperationResult<ShapeHandle>;
    createRectangle(params?: RectangleParams): OperationResult<ShapeHandle>;
    createPolygon(params: PolygonParams): OperationResult<ShapeHandle>;
    createPoint(params?: PointParams): OperationResult<ShapeHandle>;
    createEllipse(params?: EllipseParams): OperationResult<ShapeHandle>;
    createArc(params: ArcParams): OperationResult<ShapeHandle>;
    booleanUnion(params: BooleanUnionParams): OperationResult<ShapeHandle>;
    booleanSubtract(params: BooleanSubtractParams): OperationResult<ShapeHandle>;
    booleanIntersect(params: BooleanIntersectParams): OperationResult<ShapeHandle>;
    extrude(params: ExtrudeParams): OperationResult<ShapeHandle>;
    revolve(params: RevolveParams): OperationResult<ShapeHandle>;
    sweep(params: SweepParams): OperationResult<ShapeHandle>;
    loft(params: LoftParams): OperationResult<ShapeHandle>;
    fillet(params: FilletParams): OperationResult<ShapeHandle>;
    chamfer(params: ChamferParams): OperationResult<ShapeHandle>;
    shell(params: ShellParams): OperationResult<ShapeHandle>;
    offset(params: OffsetParams): OperationResult<ShapeHandle>;
    draft(params: DraftParams): OperationResult<ShapeHandle>;
    transform(params: TransformParams): OperationResult<ShapeHandle>;
    translate(params: TranslateParams): OperationResult<ShapeHandle>;
    rotate(params: RotateParams): OperationResult<ShapeHandle>;
    scale(params: ScaleParams): OperationResult<ShapeHandle>;
    mirror(params: MirrorParams): OperationResult<ShapeHandle>;
    tessellate(shapeOrId: string | ShapeHandle, options?: TessellateOptions): OperationResult<MeshData>;
    getProperties(shapeOrId: string | ShapeHandle): OperationResult<ShapeProperties>;
    getVolume(shapeOrId: string | ShapeHandle): OperationResult<number>;
    getSurfaceArea(shapeOrId: string | ShapeHandle): OperationResult<number>;
    getBoundingBox(shapeOrId: string | ShapeHandle): OperationResult<BoundingBox>;
    /**
     * Estimate the complexity of an operation before executing it.
     * Used for deciding whether to run locally or offload to remote compute.
     */
    estimateComplexity(operation: string, shapeIds: string[]): ComplexityEstimate;
    /**
     * Precompute hints for speculative execution.
     * Call this when user hovers over tools to warm up the cache.
     */
    precompute(operation: string, shapeIds: string[]): void;
    getCenterOfMass(shapeOrId: string | ShapeHandle): OperationResult<Vec3>;
    /**
     * Import geometry from file data
     * Note: This is a stub implementation - actual OCCT I/O requires
     * additional WASM bindings for STEPControl, IGESControl, etc.
     */
    importFile(params: ImportParams): OperationResult<ImportResult>;
    /**
     * Export geometry to file data
     * Note: This is a stub implementation - actual OCCT I/O requires
     * additional WASM bindings for STEPControl, StlAPI, etc.
     */
    exportFile(params: ExportParams): OperationResult<ExportResult>;
    /**
     * Generate STL data from mesh
     */
    private generateSTL;
    private assemblies;
    private assemblyIdCounter;
    private generateAssemblyId;
    createAssembly(params?: AssemblyParams): OperationResult<AssemblyHandle>;
    createMate(params: MateParams): OperationResult<AssemblyHandle>;
    createPattern(params: PatternParams): OperationResult<PatternResult>;
    getAssembly(assemblyId: string): AssemblyHandle | undefined;
    deleteAssembly(assemblyId: string): boolean;
}
export declare function createGeometryEngine(occt: WASMModule): GeometryEngine;
//# sourceMappingURL=GeometryEngine.d.ts.map