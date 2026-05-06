/**
 * GeomCore SDK - Smart Geometry Operations with Zero-Lag UX
 *
 * This SDK provides intelligent routing between local WASM execution
 * and remote GPU compute for optimal performance.
 *
 * Key Features:
 * - Automatic operation routing (local vs remote)
 * - Precomputation hints for speculative execution
 * - Memory management with LRU eviction
 * - Performance monitoring and slow operation callbacks
 *
 * @module geom-core/sdk
 */
import type { GeometryEngine } from "../bindings/GeometryEngine";
import type { ShapeHandle, OperationResult, ComputeHint, ComplexityEstimate, MeshData, TessellateOptions, BoxParams, SphereParams, CylinderParams, ConeParams, TorusParams, BooleanUnionParams, BooleanSubtractParams, BooleanIntersectParams, ExtrudeParams, RevolveParams, SweepParams, LoftParams, FilletParams, ChamferParams, ShellParams, OffsetParams, TranslateParams, RotateParams, ScaleParams, MirrorParams, ShapeProperties } from "../bindings/types";
export type { Vec3 } from "../bindings/types";
export interface GeomCoreConfig {
    /** Maximum memory usage in bytes before LRU eviction (default: 512MB) */
    maxMemoryBytes?: number;
    /** Threshold in ms for slow operation warnings (default: 100) */
    slowOperationThresholdMs?: number;
    /** Enable remote compute offloading (default: true if remoteEndpoint provided) */
    enableRemoteCompute?: boolean;
    /** Remote compute server endpoint */
    remoteEndpoint?: string;
    /** API key for remote compute (for paid tiers) */
    remoteApiKey?: string;
    /** Complexity threshold for automatic remote routing (0-1, default: 0.7) */
    remoteComplexityThreshold?: number;
    /** Enable speculative precomputation (default: true) */
    enablePrecomputation?: boolean;
    /** WebSocket connection for real-time remote compute */
    useWebSocket?: boolean;
}
export interface RemoteJobStatus {
    jobId: string;
    status: "queued" | "processing" | "completed" | "failed";
    progress?: number;
    result?: ShapeHandle;
    error?: string;
}
export type SlowOperationCallback = (operation: string, durationMs: number) => void;
export type MemoryPressureCallback = (usedBytes: number, maxBytes: number) => void;
export declare class GeomCoreSDK {
    private engine;
    private config;
    private remoteClient?;
    private precomputation;
    private slowOpCallbacks;
    private memoryCallbacks;
    private usedMemoryBytes;
    constructor(engine: GeometryEngine, config?: GeomCoreConfig);
    dispose(): void;
    getStats(): {
        shapeCount: number;
        usedMemoryBytes: number;
        maxMemoryBytes: number;
        remoteEnabled: boolean;
    };
    onSlowOperation(callback: SlowOperationCallback): () => void;
    onMemoryPressure(callback: MemoryPressureCallback): () => void;
    private notifySlowOperation;
    private checkMemoryPressure;
    private executeWithRouting;
    private extractShapeIds;
    /**
     * Hint that an operation may be performed soon (e.g., user hovering over tool).
     * The SDK will speculatively execute and cache the result.
     */
    precompute(operation: string, params: Record<string, unknown>): void;
    /**
     * Cancel a precomputation hint (e.g., user moved away from tool).
     */
    cancelPrecompute(operation: string, params: Record<string, unknown>): void;
    private getOperationExecutor;
    estimateComplexity(operation: string, shapeIds: string[]): ComplexityEstimate;
    makeBox(params?: BoxParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    makeSphere(params?: SphereParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    makeCylinder(params?: CylinderParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    makeCone(params?: ConeParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    makeTorus(params?: TorusParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    booleanUnion(params: BooleanUnionParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    booleanSubtract(params: BooleanSubtractParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    booleanIntersect(params: BooleanIntersectParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    extrude(params: ExtrudeParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    revolve(params: RevolveParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    sweep(params: SweepParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    loft(params: LoftParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    fillet(params: FilletParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    chamfer(params: ChamferParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    shell(params: ShellParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    offset(params: OffsetParams, hint?: ComputeHint): Promise<OperationResult<ShapeHandle>>;
    translate(params: TranslateParams): Promise<OperationResult<ShapeHandle>>;
    rotate(params: RotateParams): Promise<OperationResult<ShapeHandle>>;
    scale(params: ScaleParams): Promise<OperationResult<ShapeHandle>>;
    mirror(params: MirrorParams): Promise<OperationResult<ShapeHandle>>;
    tessellate(shapeId: string, options?: TessellateOptions, _hint?: ComputeHint): Promise<OperationResult<MeshData>>;
    getProperties(shapeId: string): Promise<OperationResult<ShapeProperties>>;
    getVolume(shapeId: string): Promise<OperationResult<number>>;
    getSurfaceArea(shapeId: string): Promise<OperationResult<number>>;
    disposeShape(id: string): boolean;
    disposeAll(): void;
}
export declare function createGeomCoreSDK(engine: GeometryEngine, config?: GeomCoreConfig): GeomCoreSDK;
/**
 * Create SDK configured for browser use (local WASM only)
 */
export declare function createBrowserSDK(engine: GeometryEngine): GeomCoreSDK;
/**
 * Create SDK configured for paid tier with remote GPU compute
 */
export declare function createPaidTierSDK(engine: GeometryEngine, remoteEndpoint: string, apiKey: string): GeomCoreSDK;
//# sourceMappingURL=GeomCoreSDK.d.ts.map