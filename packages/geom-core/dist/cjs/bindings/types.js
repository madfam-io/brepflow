"use strict";
/**
 * geom-core Types
 *
 * Unified type definitions for the MADFAM geometry engine.
 * Ported and extended from sim4d/engine-occt for cross-project compatibility.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandleId = createHandleId;
exports.resetHandleIdCounter = resetHandleIdCounter;
exports.getShapeId = getShapeId;
// =============================================================================
// Helper Functions
// =============================================================================
let handleIdCounter = 1;
function createHandleId(prefix = "shape") {
    return `${prefix}_${handleIdCounter++}`;
}
function resetHandleIdCounter(value = 1) {
    handleIdCounter = value;
}
function getShapeId(shapeOrId) {
    return typeof shapeOrId === "string" ? shapeOrId : shapeOrId.id;
}
//# sourceMappingURL=types.js.map