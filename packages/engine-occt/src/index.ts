export * from './worker-client';
export * from './worker-types';
export * from './geometry-api';
export * from './real-occt-bindings';
// Note: occt-worker.ts is not exported here - it's loaded as a Web Worker
export * from './production-worker';
export * from './production-api';
export * from './production-logger';
export * from './geometry-validator';
export * from './mock-geometry'; // Keep for tests
export * from './node-adapter'; // OCCT node adapter for real geometry
export * from './occt-operation-router'; // Operation routing for OCCT

// Re-export WorkerAPI type from types package
export type { WorkerAPI } from '@brepflow/types';

// Default export is the real OCCT GeometryAPI
export { GeometryAPI as default } from './geometry-api';

// Import GeometryAPI class first
import { GeometryAPI } from './geometry-api';

// Legacy exports for backward compatibility
export const getGeometryAPI = () => new GeometryAPI();
export { MockGeometry } from './mock-geometry';