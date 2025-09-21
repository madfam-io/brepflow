/**
 * Constraint solver types for 2D parametric constraints
 */

export interface Point2D {
  x: number;
  y: number;
  id?: string;
}

export interface Variable {
  id: string;
  value: number;
  type: 'x' | 'y' | 'angle' | 'distance' | 'parameter';
}

export type ConstraintType = 
  | 'distance'
  | 'horizontal'
  | 'vertical'
  | 'parallel'
  | 'perpendicular'
  | 'coincident'
  | 'tangent'
  | 'concentric'
  | 'angle';

export interface Constraint2D {
  id: string;
  type: ConstraintType;
  entities: string[];
  parameters?: Record<string, number>;
  enabled: boolean;
}

export interface SolveResult {
  success: boolean;
  iterations: number;
  residual: number;
  variables: Record<string, number>;
  error?: string;
}