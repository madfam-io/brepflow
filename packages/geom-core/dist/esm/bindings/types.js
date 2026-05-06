/**
 * geom-core Types
 *
 * Unified type definitions for the MADFAM geometry engine.
 * Ported and extended from sim4d/engine-occt for cross-project compatibility.
 */
// =============================================================================
// Helper Functions
// =============================================================================
let handleIdCounter = 1;
export function createHandleId(prefix = "shape") {
    return `${prefix}_${handleIdCounter++}`;
}
export function resetHandleIdCounter(value = 1) {
    handleIdCounter = value;
}
export function getShapeId(shapeOrId) {
    return typeof shapeOrId === "string" ? shapeOrId : shapeOrId.id;
}
//# sourceMappingURL=types.js.map