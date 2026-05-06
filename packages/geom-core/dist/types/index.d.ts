/**
 * geom-core - Unified Geometry Engine for MADFAM Ecosystem
 *
 * A high-performance B-Rep geometry engine built on OpenCASCADE Technology (OCCT).
 * Designed for zero-lag browser execution with optional remote GPU compute offloading.
 *
 * @packageDocumentation
 * @module geom-core
 *
 * @example
 * ```typescript
 * import { createGeomCoreSDK, createGeometryEngine } from '@madfam/geom-core';
 * import initOCCT from 'opencascade.js';
 *
 * // Initialize WASM module
 * const occt = await initOCCT();
 *
 * // Create engine and SDK
 * const engine = createGeometryEngine(occt);
 * const sdk = createGeomCoreSDK(engine, {
 *   enablePrecomputation: true,
 *   maxMemoryBytes: 512 * 1024 * 1024,
 * });
 *
 * // Create a box
 * const result = await sdk.makeBox({ width: 100, height: 50, depth: 75 });
 * if (result.success) {
 *   console.log('Created shape:', result.value.id);
 *
 *   // Tessellate for Three.js
 *   const mesh = await sdk.tessellate(result.value.id);
 *   // Use mesh.positions, mesh.normals, mesh.indices with Three.js
 * }
 * ```
 */
export type { Vec3, BoundingBox, ShapeType, ShapeHandle, MeshData, TessellateOptions, BoxParams, SphereParams, CylinderParams, ConeParams, TorusParams, LineParams, CircleParams, RectangleParams, ArcParams, PolygonParams, EllipseParams, PointParams, BooleanUnionParams, BooleanSubtractParams, BooleanIntersectParams, ExtrudeParams, RevolveParams, SweepParams, LoftParams, FilletParams, ChamferParams, ShellParams, DraftParams, OffsetParams, TransformParams, TranslateParams, RotateParams, ScaleParams, MirrorParams, Matrix4x4Object, ShapeProperties, OperationResult, ComplexityEstimate, ComputeLocation, ComputeHint, ImportFormat, ExportFormat, ImportParams, ExportParams, ExportOptions, ImportResult, ExportResult, AssemblyParams, AssemblyHandle, AssemblyPart, PartTransform, MateType, MateParams, MateConstraint, PatternType, PatternParams, PatternResult, WASMModule, OCCTShape, OCCTHandle, } from "./bindings/types";
export { createHandleId, resetHandleIdCounter, getShapeId, } from "./bindings/types";
export { GeometryEngine, createGeometryEngine, } from "./bindings/GeometryEngine";
export type { GeomCoreConfig, RemoteJobStatus, SlowOperationCallback, MemoryPressureCallback, } from "./sdk/GeomCoreSDK";
export { GeomCoreSDK, createGeomCoreSDK, createBrowserSDK, createPaidTierSDK, } from "./sdk/GeomCoreSDK";
export declare const VERSION = "0.1.0";
export declare const OCCT_VERSION = "7.7.0";
//# sourceMappingURL=index.d.ts.map