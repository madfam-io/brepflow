"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCCT_VERSION = exports.VERSION = exports.createPaidTierSDK = exports.createBrowserSDK = exports.createGeomCoreSDK = exports.GeomCoreSDK = exports.createGeometryEngine = exports.GeometryEngine = exports.getShapeId = exports.resetHandleIdCounter = exports.createHandleId = void 0;
var types_1 = require("./bindings/types");
Object.defineProperty(exports, "createHandleId", { enumerable: true, get: function () { return types_1.createHandleId; } });
Object.defineProperty(exports, "resetHandleIdCounter", { enumerable: true, get: function () { return types_1.resetHandleIdCounter; } });
Object.defineProperty(exports, "getShapeId", { enumerable: true, get: function () { return types_1.getShapeId; } });
// =============================================================================
// Core Engine
// =============================================================================
var GeometryEngine_1 = require("./bindings/GeometryEngine");
Object.defineProperty(exports, "GeometryEngine", { enumerable: true, get: function () { return GeometryEngine_1.GeometryEngine; } });
Object.defineProperty(exports, "createGeometryEngine", { enumerable: true, get: function () { return GeometryEngine_1.createGeometryEngine; } });
var GeomCoreSDK_1 = require("./sdk/GeomCoreSDK");
Object.defineProperty(exports, "GeomCoreSDK", { enumerable: true, get: function () { return GeomCoreSDK_1.GeomCoreSDK; } });
Object.defineProperty(exports, "createGeomCoreSDK", { enumerable: true, get: function () { return GeomCoreSDK_1.createGeomCoreSDK; } });
Object.defineProperty(exports, "createBrowserSDK", { enumerable: true, get: function () { return GeomCoreSDK_1.createBrowserSDK; } });
Object.defineProperty(exports, "createPaidTierSDK", { enumerable: true, get: function () { return GeomCoreSDK_1.createPaidTierSDK; } });
// =============================================================================
// Version
// =============================================================================
exports.VERSION = "0.1.0";
exports.OCCT_VERSION = "7.7.0";
//# sourceMappingURL=index.js.map