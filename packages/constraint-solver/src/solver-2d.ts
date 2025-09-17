/**
 * 2D Parametric Constraint Solver
 * Implements a geometric constraint solver for 2D sketching
 * using numerical methods (Newton-Raphson iteration)
 */

import { Vec2, Mat2 } from '@brepflow/types';

export enum ConstraintType {
  // Geometric constraints
  COINCIDENT = 'coincident',
  PARALLEL = 'parallel',
  PERPENDICULAR = 'perpendicular',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  TANGENT = 'tangent',
  CONCENTRIC = 'concentric',
  COLINEAR = 'colinear',
  
  // Dimensional constraints
  DISTANCE = 'distance',
  ANGLE = 'angle',
  RADIUS = 'radius',
  DIAMETER = 'diameter',
  LENGTH = 'length',
  
  // Relational constraints
  EQUAL = 'equal',
  SYMMETRIC = 'symmetric',
  MIDPOINT = 'midpoint',
  
  // Fixed constraints
  FIXED = 'fixed',
  FIXED_X = 'fixed_x',
  FIXED_Y = 'fixed_y'
}

export interface SketchEntity {
  id: string;
  type: 'point' | 'line' | 'circle' | 'arc' | 'spline';
  params: number[]; // Parameters that can be solved
  fixed: boolean[];  // Which parameters are fixed
}

export interface Constraint2D {
  id: string;
  type: ConstraintType;
  entities: string[]; // Entity IDs involved
  value?: number; // For dimensional constraints
  weight: number; // Constraint importance (0-1)
}

export class Solver2D {
  private entities: Map<string, SketchEntity> = new Map();
  private constraints: Map<string, Constraint2D> = new Map();
  private parameters: number[] = [];
  private parameterMap: Map<string, number[]> = new Map();
  
  // Solver configuration
  private readonly MAX_ITERATIONS = 100;
  private readonly TOLERANCE = 1e-6;
  private readonly DAMPING_FACTOR = 0.8;
  
  /**
   * Add a sketch entity to the solver
   */
  addEntity(entity: SketchEntity): void {
    this.entities.set(entity.id, entity);
    this.updateParameterMap();
  }
  
  /**
   * Add a constraint to the solver
   */
  addConstraint(constraint: Constraint2D): void {
    // Validate entities exist
    for (const entityId of constraint.entities) {
      if (!this.entities.has(entityId)) {
        throw new Error(`Entity ${entityId} not found`);
      }
    }
    this.constraints.set(constraint.id, constraint);
  }
  
  /**
   * Solve the constraint system using Newton-Raphson method
   */
  solve(): { success: boolean; iterations: number; error: number } {
    this.buildParameterArray();
    
    let iteration = 0;
    let error = Number.MAX_VALUE;
    
    while (iteration < this.MAX_ITERATIONS && error > this.TOLERANCE) {
      const residuals = this.computeResiduals();
      const jacobian = this.computeJacobian();
      
      // Solve J * delta = -R for parameter updates
      const delta = this.solveLinearSystem(jacobian, residuals);
      
      // Apply damped update
      for (let i = 0; i < this.parameters.length; i++) {
        this.parameters[i] += this.DAMPING_FACTOR * delta[i];
      }
      
      // Update entities with new parameters
      this.updateEntities();
      
      // Calculate error
      error = Math.sqrt(residuals.reduce((sum, r) => sum + r * r, 0));
      iteration++;
    }
    
    return {
      success: error <= this.TOLERANCE,
      iterations: iteration,
      error: error
    };
  }
  
  /**
   * Compute constraint residuals (error terms)
   */
  private computeResiduals(): number[] {
    const residuals: number[] = [];
    
    for (const constraint of this.constraints.values()) {
      const r = this.evaluateConstraint(constraint);
      residuals.push(...r);
    }
    
    return residuals;
  }
  
  /**
   * Compute Jacobian matrix (partial derivatives)
   */
  private computeJacobian(): number[][] {
    const numConstraints = this.getConstraintCount();
    const numParams = this.parameters.length;
    const jacobian: number[][] = Array(numConstraints)
      .fill(0)
      .map(() => Array(numParams).fill(0));
    
    const h = 1e-7; // Finite difference step
    
    for (let j = 0; j < numParams; j++) {
      // Store original value
      const original = this.parameters[j];
      
      // Forward difference
      this.parameters[j] = original + h;
      this.updateEntities();
      const residualsPlus = this.computeResiduals();
      
      // Backward difference
      this.parameters[j] = original - h;
      this.updateEntities();
      const residualsMinus = this.computeResiduals();
      
      // Central difference approximation
      for (let i = 0; i < numConstraints; i++) {
        jacobian[i][j] = (residualsPlus[i] - residualsMinus[i]) / (2 * h);
      }
      
      // Restore original value
      this.parameters[j] = original;
    }
    
    this.updateEntities();
    return jacobian;
  }
  
  /**
   * Evaluate a single constraint
   */
  private evaluateConstraint(constraint: Constraint2D): number[] {
    switch (constraint.type) {
      case ConstraintType.COINCIDENT:
        return this.evaluateCoincident(constraint);
      case ConstraintType.DISTANCE:
        return this.evaluateDistance(constraint);
      case ConstraintType.PARALLEL:
        return this.evaluateParallel(constraint);
      case ConstraintType.PERPENDICULAR:
        return this.evaluatePerpendicular(constraint);
      case ConstraintType.HORIZONTAL:
        return this.evaluateHorizontal(constraint);
      case ConstraintType.VERTICAL:
        return this.evaluateVertical(constraint);
      case ConstraintType.ANGLE:
        return this.evaluateAngle(constraint);
      case ConstraintType.RADIUS:
        return this.evaluateRadius(constraint);
      case ConstraintType.FIXED:
        return this.evaluateFixed(constraint);
      default:
        return [0];
    }
  }
  
  /**
   * Constraint evaluation functions
   */
  private evaluateCoincident(constraint: Constraint2D): number[] {
    const [e1, e2] = constraint.entities.map(id => this.entities.get(id)!);
    if (e1.type === 'point' && e2.type === 'point') {
      const dx = e1.params[0] - e2.params[0];
      const dy = e1.params[1] - e2.params[1];
      return [dx * constraint.weight, dy * constraint.weight];
    }
    return [0];
  }
  
  private evaluateDistance(constraint: Constraint2D): number[] {
    const [e1, e2] = constraint.entities.map(id => this.entities.get(id)!);
    const targetDistance = constraint.value || 0;
    
    if (e1.type === 'point' && e2.type === 'point') {
      const dx = e1.params[0] - e2.params[0];
      const dy = e1.params[1] - e2.params[1];
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      return [(currentDistance - targetDistance) * constraint.weight];
    }
    return [0];
  }
  
  private evaluateParallel(constraint: Constraint2D): number[] {
    const [e1, e2] = constraint.entities.map(id => this.entities.get(id)!);
    if (e1.type === 'line' && e2.type === 'line') {
      // Lines defined by two points each
      const dx1 = e1.params[2] - e1.params[0];
      const dy1 = e1.params[3] - e1.params[1];
      const dx2 = e2.params[2] - e2.params[0];
      const dy2 = e2.params[3] - e2.params[1];
      
      // Cross product should be zero for parallel lines
      const cross = dx1 * dy2 - dy1 * dx2;
      return [cross * constraint.weight];
    }
    return [0];
  }
  
  private evaluatePerpendicular(constraint: Constraint2D): number[] {
    const [e1, e2] = constraint.entities.map(id => this.entities.get(id)!);
    if (e1.type === 'line' && e2.type === 'line') {
      const dx1 = e1.params[2] - e1.params[0];
      const dy1 = e1.params[3] - e1.params[1];
      const dx2 = e2.params[2] - e2.params[0];
      const dy2 = e2.params[3] - e2.params[1];
      
      // Dot product should be zero for perpendicular lines
      const dot = dx1 * dx2 + dy1 * dy2;
      return [dot * constraint.weight];
    }
    return [0];
  }
  
  private evaluateHorizontal(constraint: Constraint2D): number[] {
    const entity = this.entities.get(constraint.entities[0])!;
    if (entity.type === 'line') {
      const dy = entity.params[3] - entity.params[1];
      return [dy * constraint.weight];
    }
    return [0];
  }
  
  private evaluateVertical(constraint: Constraint2D): number[] {
    const entity = this.entities.get(constraint.entities[0])!;
    if (entity.type === 'line') {
      const dx = entity.params[2] - entity.params[0];
      return [dx * constraint.weight];
    }
    return [0];
  }
  
  private evaluateAngle(constraint: Constraint2D): number[] {
    const [e1, e2] = constraint.entities.map(id => this.entities.get(id)!);
    const targetAngle = constraint.value || 0;
    
    if (e1.type === 'line' && e2.type === 'line') {
      const dx1 = e1.params[2] - e1.params[0];
      const dy1 = e1.params[3] - e1.params[1];
      const dx2 = e2.params[2] - e2.params[0];
      const dy2 = e2.params[3] - e2.params[1];
      
      const angle1 = Math.atan2(dy1, dx1);
      const angle2 = Math.atan2(dy2, dx2);
      let angleDiff = angle2 - angle1;
      
      // Normalize angle difference to [-π, π]
      while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
      
      return [(angleDiff - targetAngle) * constraint.weight];
    }
    return [0];
  }
  
  private evaluateRadius(constraint: Constraint2D): number[] {
    const entity = this.entities.get(constraint.entities[0])!;
    const targetRadius = constraint.value || 0;
    
    if (entity.type === 'circle' || entity.type === 'arc') {
      const currentRadius = entity.params[2]; // Assuming [cx, cy, r]
      return [(currentRadius - targetRadius) * constraint.weight];
    }
    return [0];
  }
  
  private evaluateFixed(constraint: Constraint2D): number[] {
    const entity = this.entities.get(constraint.entities[0])!;
    const residuals: number[] = [];
    
    for (let i = 0; i < entity.params.length; i++) {
      if (entity.fixed[i]) {
        // This parameter should not change from its initial value
        residuals.push(0); // Placeholder - would track original value
      }
    }
    return residuals;
  }
  
  /**
   * Solve linear system using Gaussian elimination
   */
  private solveLinearSystem(A: number[][], b: number[]): number[] {
    const n = b.length;
    const m = A[0].length;
    
    // Use least squares if overdetermined
    if (n > m) {
      return this.leastSquares(A, b);
    }
    
    // Standard Gaussian elimination for square or underdetermined systems
    const augmented = A.map((row, i) => [...row, -b[i]]);
    
    // Forward elimination
    for (let i = 0; i < Math.min(n, m); i++) {
      // Partial pivoting
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
      
      // Make all rows below this one 0 in current column
      for (let k = i + 1; k < n; k++) {
        const factor = augmented[k][i] / augmented[i][i];
        for (let j = i; j <= m; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }
    
    // Back substitution
    const x = new Array(m).fill(0);
    for (let i = Math.min(n, m) - 1; i >= 0; i--) {
      x[i] = augmented[i][m];
      for (let j = i + 1; j < m; j++) {
        x[i] -= augmented[i][j] * x[j];
      }
      x[i] /= augmented[i][i];
    }
    
    return x;
  }
  
  /**
   * Least squares solution for overdetermined systems
   */
  private leastSquares(A: number[][], b: number[]): number[] {
    // Solve A^T * A * x = A^T * b
    const At = this.transpose(A);
    const AtA = this.matrixMultiply(At, A);
    const Atb = this.vectorMultiply(At, b);
    return this.solveLinearSystem(AtA, Atb);
  }
  
  private transpose(A: number[][]): number[][] {
    return A[0].map((_, i) => A.map(row => row[i]));
  }
  
  private matrixMultiply(A: number[][], B: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < B[0].length; j++) {
        result[i][j] = 0;
        for (let k = 0; k < B.length; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  }
  
  private vectorMultiply(A: number[][], b: number[]): number[] {
    return A.map(row => row.reduce((sum, val, i) => sum + val * b[i], 0));
  }
  
  /**
   * Helper methods
   */
  private buildParameterArray(): void {
    this.parameters = [];
    this.parameterMap.clear();
    
    for (const [id, entity] of this.entities) {
      const indices: number[] = [];
      for (let i = 0; i < entity.params.length; i++) {
        if (!entity.fixed[i]) {
          indices.push(this.parameters.length);
          this.parameters.push(entity.params[i]);
        } else {
          indices.push(-1); // Fixed parameter
        }
      }
      this.parameterMap.set(id, indices);
    }
  }
  
  private updateParameterMap(): void {
    // Called when entities are added/removed
    this.buildParameterArray();
  }
  
  private updateEntities(): void {
    for (const [id, entity] of this.entities) {
      const indices = this.parameterMap.get(id)!;
      for (let i = 0; i < indices.length; i++) {
        if (indices[i] >= 0) {
          entity.params[i] = this.parameters[indices[i]];
        }
      }
    }
  }
  
  private getConstraintCount(): number {
    let count = 0;
    for (const constraint of this.constraints.values()) {
      count += this.evaluateConstraint(constraint).length;
    }
    return count;
  }
  
  /**
   * Export solver state for debugging
   */
  getState(): {
    entities: SketchEntity[];
    constraints: Constraint2D[];
    parameters: number[];
  } {
    return {
      entities: Array.from(this.entities.values()),
      constraints: Array.from(this.constraints.values()),
      parameters: [...this.parameters]
    };
  }
}