import type { Vec3, ShapeHandle, MeshData, BoundingBox } from '@brepflow/types';

// Worker message types
export type WorkerRequest =
  | InitRequest
  | CreateLineRequest
  | CreateCircleRequest
  | CreateRectangleRequest
  | CreateBoxRequest
  | CreateCylinderRequest
  | CreateSphereRequest
  | MakeExtrudeRequest
  | MakeRevolveRequest
  | MakeSweepRequest
  | MakeLoftRequest
  | BooleanUnionRequest
  | BooleanSubtractRequest
  | BooleanIntersectRequest
  | MakeFilletRequest
  | MakeChamferRequest
  | MakeShellRequest
  | TransformRequest
  | TessellateRequest
  | ImportSTEPRequest
  | ExportSTEPRequest
  | ExportSTLRequest
  | DisposeRequest
  | HealthCheckRequest
  | CleanupRequest
  | ShutdownRequest;

export interface WorkerResponse<T = any> {
  id: string;
  success: boolean;
  result?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Request interfaces
export interface BaseRequest {
  id: string;
  type: string;
}

export interface InitRequest extends BaseRequest {
  type: 'INIT';
  params: {};
}

export interface CreateLineRequest extends BaseRequest {
  type: 'CREATE_LINE';
  params: {
    start: Vec3;
    end: Vec3;
  };
}

export interface CreateRectangleRequest extends BaseRequest {
  type: 'CREATE_RECTANGLE';
  params: {
    center: Vec3;
    width: number;
    height: number;
  };
}

export interface CreateCircleRequest extends BaseRequest {
  type: 'CREATE_CIRCLE';
  params: {
    center: Vec3;
    radius: number;
    normal: Vec3;
  };
}

export interface CreateBoxRequest extends BaseRequest {
  type: 'MAKE_BOX';
  params: {
    center: Vec3;
    width: number;
    height: number;
    depth: number;
  };
}

export interface CreateCylinderRequest extends BaseRequest {
  type: 'MAKE_CYLINDER';
  params: {
    center: Vec3;
    axis: Vec3;
    radius: number;
    height: number;
  };
}

export interface CreateSphereRequest extends BaseRequest {
  type: 'MAKE_SPHERE';
  params: {
    center: Vec3;
    radius: number;
  };
}

export interface MakeExtrudeRequest extends BaseRequest {
  type: 'MAKE_EXTRUDE';
  params: {
    profile: ShapeHandle;
    direction: Vec3;
    distance: number;
    draft?: number;
  };
}

export interface MakeRevolveRequest extends BaseRequest {
  type: 'MAKE_REVOLVE';
  params: {
    profile: ShapeHandle;
    axis?: ShapeHandle;
    angle: number;
    origin: Vec3;
    direction: Vec3;
  };
}

export interface MakeSweepRequest extends BaseRequest {
  type: 'MAKE_SWEEP';
  params: {
    profile: ShapeHandle;
    path: ShapeHandle;
    twist?: number;
    scale?: number;
  };
}

export interface MakeLoftRequest extends BaseRequest {
  type: 'MAKE_LOFT';
  params: {
    profiles: ShapeHandle[];
    ruled?: boolean;
    closed?: boolean;
  };
}

export interface BooleanUnionRequest extends BaseRequest {
  type: 'BOOLEAN_UNION';
  params: {
    shapes: ShapeHandle[];
    simplify?: boolean;
  };
}

export interface BooleanSubtractRequest extends BaseRequest {
  type: 'BOOLEAN_SUBTRACT';
  params: {
    base: ShapeHandle;
    tools: ShapeHandle[];
    simplify?: boolean;
  };
}

export interface BooleanIntersectRequest extends BaseRequest {
  type: 'BOOLEAN_INTERSECT';
  params: {
    shapes: ShapeHandle[];
    simplify?: boolean;
  };
}

export interface MakeFilletRequest extends BaseRequest {
  type: 'MAKE_FILLET';
  params: {
    shape: ShapeHandle;
    edges?: ShapeHandle[];
    radius: number;
    selectAll?: boolean;
  };
}

export interface MakeChamferRequest extends BaseRequest {
  type: 'MAKE_CHAMFER';
  params: {
    shape: ShapeHandle;
    edges?: ShapeHandle[];
    distance: number;
    selectAll?: boolean;
  };
}

export interface MakeShellRequest extends BaseRequest {
  type: 'MAKE_SHELL';
  params: {
    shape: ShapeHandle;
    faces?: ShapeHandle[];
    thickness: number;
    inside?: boolean;
  };
}

export interface TransformRequest extends BaseRequest {
  type: 'TRANSFORM_MOVE' | 'TRANSFORM_ROTATE' | 'TRANSFORM_SCALE' | 'TRANSFORM_MIRROR';
  params: {
    shape: ShapeHandle;
    offset?: Vec3;
    angle?: number;
    axis?: Vec3;
    origin?: Vec3;
    scale?: number | Vec3;
    plane?: 'XY' | 'XZ' | 'YZ';
  };
}

export interface TessellateRequest extends BaseRequest {
  type: 'TESSELLATE';
  params: {
    shape: ShapeHandle;
    deflection: number;
    angle?: number;
  };
}

export interface ImportSTEPRequest extends BaseRequest {
  type: 'IMPORT_STEP';
  params: {
    filepath: string;
    data?: ArrayBuffer;
  };
}

export interface ExportSTEPRequest extends BaseRequest {
  type: 'EXPORT_STEP';
  params: {
    shapes: ShapeHandle[];
    filepath?: string;
    asAssembly?: boolean;
  };
}

export interface ExportSTLRequest extends BaseRequest {
  type: 'EXPORT_STL';
  params: {
    shape: ShapeHandle;
    filepath?: string;
    binary?: boolean;
    deflection?: number;
  };
}

export interface DisposeRequest extends BaseRequest {
  type: 'DISPOSE';
  params: {
    handle: string;
  };
}

export interface HealthCheckRequest extends BaseRequest {
  type: 'HEALTH_CHECK';
  params: {};
}

export interface CleanupRequest extends BaseRequest {
  type: 'CLEANUP';
  params: {};
}

export interface ShutdownRequest extends BaseRequest {
  type: 'SHUTDOWN';
  params: {};
}

// Result types
export interface GeometryResult {
  handle: ShapeHandle;
  bbox?: BoundingBox;
  hash?: string;
}

export interface TessellationResult {
  mesh: MeshData;
  bbox: BoundingBox;
}

export interface ImportResult {
  shapes: ShapeHandle[];
}

export interface ExportResult {
  data?: ArrayBuffer;
  filepath?: string;
  success: boolean;
}

export interface HealthCheckResult {
  healthy: boolean;
  memoryUsage: number;
  uptime: number;
}