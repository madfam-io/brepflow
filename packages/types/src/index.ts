// Core BrepFlow types

export type NodeId = string;
export type SocketId = string;
export type HandleId = string;

// Geometry types
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Mat4 {
  elements: number[]; // 16 elements
}

export interface BoundingBox {
  min: Vec3;
  max: Vec3;
}

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
  type: string;
  category: string;
  label: string;
  description?: string;
  inputs: Record<keyof I, SocketSpec>;
  outputs: Record<keyof O, SocketSpec>;
  params: ParamSpec<P>;
  evaluate: (ctx: EvalContext, inputs: I, params: P) => Promise<O>;
}

// Parameter specifications
export interface ParamSpec<T = any> {
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

// Evaluation context
export interface EvalContext {
  nodeId: NodeId;
  graph: GraphInstance;
  cache: Map<string, any>;
  worker: WorkerAPI;
  abort?: AbortController;
}

// Graph types
export interface GraphInstance {
  version: string;
  units: 'mm' | 'cm' | 'm' | 'in';
  tolerance: number;
  nodes: NodeInstance[];
  edges: Edge[];
  metadata?: {
    created?: string;
    author?: string;
    description?: string;
  };
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
}

// Worker communication types
export interface WorkerRequest {
  id: number;
  type: string;
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