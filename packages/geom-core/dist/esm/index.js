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
export { createHandleId, resetHandleIdCounter, getShapeId, } from "./bindings/types";
// =============================================================================
// Core Engine
// =============================================================================
export { GeometryEngine, createGeometryEngine, } from "./bindings/GeometryEngine";
export { GeomCoreSDK, createGeomCoreSDK, createBrowserSDK, createPaidTierSDK, } from "./sdk/GeomCoreSDK";
// =============================================================================
// Version
// =============================================================================
export const VERSION = "0.1.0";
export const OCCT_VERSION = "7.7.0";
//# sourceMappingURL=index.js.map