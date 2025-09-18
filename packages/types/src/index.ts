/**
 * Core BrepFlow types
 * Centralized type definitions for the entire monorepo
 */

// Re-export core types from structured modules
export {
  // Branded identifier types
  NodeId,
  EdgeId,
  SocketId,
  HandleId,
  GraphId,
  UserId,
  SessionId,
  ProjectId
} from './core/identifiers';

export {
  // Geometry primitives
  Vec3,
  Vec2,
  Quaternion,
  Mat4,
  Mat2,
  Mat3,
  BoundingBox,
  Ray,
  Plane,
  Transform,
  Color
} from './core/geometry';

export {
  // Error handling system
  ErrorCode,
  ErrorSeverity,
  ErrorContext,
  BrepFlowError,
  GeometryError,
  ValidationError,
  NetworkError,
  StateError,
  ErrorRecoveryStrategy,
  ErrorHandler
} from './core/errors';

// Legacy type exports for backward compatibility
// These will be deprecated in Phase 2
import type { Vec3, Vec2, Mat2, Mat4, BoundingBox, Quaternion } from './core/geometry';
import type { NodeId, EdgeId, SocketId, HandleId } from './core/identifiers';

// Parameter types
export type ParamValue =
  | number
  | string
  | boolean
  | Vec3
  | Mat4
  | EnumValue
  | Expression;

export interface EnumValue {
  value: string;
  options: string[];
}

export interface Expression {
  raw: string;
  evaluated?: number;
}

// Socket types
export type SocketType =
  | 'Shape'
  | 'Curve'
  | 'Surface'
  | 'Solid'
  | 'Vector'
  | 'Number'
  | 'Boolean'
  | 'String'
  | 'Array'
  | 'Geometry'
  | 'Point'
  | 'Plane'
  | 'Matrix'
  | 'Box'
  | 'Any'
  | 'Point[]'
  | 'Curve[]'
  | 'Surface[]'
  | 'Vector[]'
  | 'Number[]'
  | 'Boolean[]'
  | 'Number[][]'
  | 'Point[][]'
  | 'Geometry[]'
  | 'Any[]'
  | 'Any[][]';

export interface SocketRef {
  nodeId: NodeId;
  socketId: SocketId;
}

export interface SocketSpec {
  type: SocketType;
  label?: string;
  multiple?: boolean;
  optional?: boolean;
  required?: boolean;
}

// Node types
export interface NodeInstance<I = any, O = any, P = any> {
  id: NodeId;
  type: string;
  position?: { x: number; y: number };
  inputs: Partial<Record<keyof I, SocketRef | SocketRef[]>>;
  outputs?: Partial<Record<keyof O, any>>;
  params: P;
  state?: Record<string, unknown>;
  dirty?: boolean;
}

export interface NodeDefinition<I = any, O = any, P = any> {
  id: string;
  category: string;
  label: string;
  description?: string;
  inputs: Record<keyof I, SocketSpec>;
  outputs: Record<keyof O, SocketSpec>;
  params: ParamSpec;
  evaluate: (ctx: EvalContext, inputs: I, params: P) => Promise<O>;
  execute?: (inputs: I, params: P, context: EvalContext) => Promise<O>;
}

// Parameter specifications
export interface ParamSpec {
  [key: string]: ParamDefinition;
}

export interface ParamDefinition {
  type: 'number' | 'string' | 'boolean' | 'vec3' | 'enum' | 'expression';
  label?: string;
  default?: any;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

// Constraint system integration
export interface ConstraintElement {
  id: string;
  type: 'point' | 'line' | 'circle' | 'arc';
  data: any;
}

export interface ConstraintInfo {
  elements: ConstraintElement[];
  activeConstraints: string[];
}

// Enhanced output types for constraint-aware nodes
export interface ParametricOutput<T = any> {
  geometry: T;
  constraints?: ConstraintInfo;
}

// Evaluation context
export interface EvalContext {
  nodeId: NodeId;
  graph: GraphInstance;
  cache: Map<string, any>;
  worker: WorkerAPI;
  constraintManager?: any; // ConstraintManager from engine-core
  abort?: AbortController;
}

// Constraint system persistence
export interface ConstraintSystemState {
  geometry: Array<[string, any]>;
  constraints: Array<[string, any]>;
  variables: Array<[string, number]>;
  solved: boolean;
  lastSolveTime: number;
  iterations: number;
}

// Graph types
export interface GraphInstance {
  version: string;
  units: 'mm' | 'cm' | 'm' | 'in';
  tolerance: number;
  nodes: NodeInstance[];
  edges: Edge[];
  constraints?: ConstraintSystemState;
  metadata?: {
    created?: string;
    author?: string;
    description?: string;
  };
}

// Type aliases for compatibility
export type Graph = GraphInstance;
export type Node = NodeInstance;
export type Connection = Edge;

// Re-export utility functions for creating branded types
export { NodeId as createNodeId } from './core/identifiers';
export { EdgeId as createEdgeId } from './core/identifiers';
export { SocketId as createSocketId } from './core/identifiers';
export { HandleId as createHandleId } from './core/identifiers';
export { GraphId as createGraphId } from './core/identifiers';
export { UserId as createUserId } from './core/identifiers';
export { SessionId as createSessionId } from './core/identifiers';
export { ProjectId as createProjectId } from './core/identifiers';

// Constraint handle type
export interface ConstraintHandle {
  id: string;
  type: string;
  entities: string[];
  parameters: Record<string, number>;
}

export interface Edge {
  id: string;
  source: NodeId;
  sourceHandle: SocketId;
  target: NodeId;
  targetHandle: SocketId;
}

// Worker API
export interface WorkerAPI {
  init?(): Promise<void>;
  invoke<T = any>(operation: string, params: any): Promise<T>;
  tessellate(shapeId: HandleId, deflection: number): Promise<MeshData>;
  dispose(handleId: HandleId): Promise<void>;
  terminate?(): Promise<void>;
}

// Worker communication types
export type WorkerMessageType =
  | 'INIT'
  | 'HEALTH_CHECK'
  | 'CLEANUP'
  | 'SHUTDOWN'
  | 'MAKE_BOX'
  | 'MAKE_SPHERE'
  | 'MAKE_CYLINDER'
  | 'MAKE_CONE'
  | 'MAKE_TORUS'
  | 'MAKE_EXTRUDE'
  | 'TESSELLATE'
  | 'DISPOSE'
  | string;

export interface WorkerRequest {
  id: number;
  type: WorkerMessageType;
  params: any;
}

export interface WorkerResponse {
  id?: number;
  success?: boolean;
  result?: any;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  type?: string;
}

// Geometry handles
export interface ShapeHandle {
  id: HandleId;
  type: 'solid' | 'surface' | 'curve';
  bbox?: BoundingBox;
  hash?: string;
}

// Assembly handle
export interface AssemblyHandle {
  id: HandleId;
  name: string;
  parts: ShapeHandle[];
  mates: MateConstraint[];
  visible: boolean;
  hash?: string;
}

// Assembly constraint types
export interface MateConstraint {
  id: string;
  type: 'coincident' | 'concentric' | 'parallel' | 'perpendicular' | 'tangent' | 'distance' | 'angle';
  part1: HandleId;
  part2: HandleId;
  axis1?: Vec3;
  axis2?: Vec3;
  distance?: number;
  angle?: number;
}

// Mesh data
export interface MeshData {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
  edges?: Uint32Array;
}

// Export formats
export type ExportFormat = 'step' | 'iges' | 'stl' | 'obj' | '3dm' | 'gltf' | 'usd';

export interface ExportOptions {
  format: ExportFormat;
  binary?: boolean;
  units?: string;
  tolerance?: number;
}