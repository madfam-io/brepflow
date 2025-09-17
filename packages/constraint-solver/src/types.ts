import type { Vec3 } from '@brepflow/types';

export type ConstraintType =
  | 'coincident'
  | 'parallel'
  | 'perpendicular'
  | 'tangent'
  | 'concentric'
  | 'horizontal'
  | 'vertical'
  | 'distance'
  | 'angle'
  | 'radius'
  | 'equal'
  | 'symmetric'
  | 'fixed';

export interface ConstraintEntity {
  id: string;
  type: 'point' | 'line' | 'circle' | 'arc' | 'spline' | 'plane';
  position?: Vec3;
  direction?: Vec3;
  radius?: number;
  normal?: Vec3;
  parameters: Map<string, number>;
}

export interface Constraint {
  id: string;
  type: ConstraintType;
  entities: string[]; // Entity IDs
  value?: number; // For dimensional constraints
  priority?: number;
  active: boolean;
}

export interface ConstraintSolution {
  success: boolean;
  iterations: number;
  residual: number;
  updates: Map<string, ConstraintEntity>;
  conflicts?: string[];
}

export interface SolverOptions {
  maxIterations?: number;
  tolerance?: number;
  damping?: number;
  method?: 'newton-raphson' | 'gradient-descent' | 'hybrid';
  verbose?: boolean;
}