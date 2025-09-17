import type { Vec3 } from '@brepflow/types';
import type { Constraint, ConstraintEntity } from './types';

export class GeometricConstraint {
  constructor(public constraint: Constraint) {}

  evaluate(entities: Map<string, ConstraintEntity>): number {
    switch (this.constraint.type) {
      case 'coincident':
        return this.evaluateCoincident(entities);
      case 'parallel':
        return this.evaluateParallel(entities);
      case 'perpendicular':
        return this.evaluatePerpendicular(entities);
      case 'tangent':
        return this.evaluateTangent(entities);
      case 'horizontal':
        return this.evaluateHorizontal(entities);
      case 'vertical':
        return this.evaluateVertical(entities);
      default:
        return 0;
    }
  }

  private evaluateCoincident(entities: Map<string, ConstraintEntity>): number {
    const [e1, e2] = this.getEntities(entities);
    if (!e1?.position || !e2?.position) return Infinity;

    return Math.sqrt(
      Math.pow(e1.position[0] - e2.position[0], 2) +
      Math.pow(e1.position[1] - e2.position[1], 2) +
      Math.pow(e1.position[2] - e2.position[2], 2)
    );
  }

  private evaluateParallel(entities: Map<string, ConstraintEntity>): number {
    const [e1, e2] = this.getEntities(entities);
    if (!e1?.direction || !e2?.direction) return Infinity;

    const dot = this.dot(e1.direction, e2.direction);
    return Math.abs(Math.abs(dot) - 1);
  }

  private evaluatePerpendicular(entities: Map<string, ConstraintEntity>): number {
    const [e1, e2] = this.getEntities(entities);
    if (!e1?.direction || !e2?.direction) return Infinity;

    return Math.abs(this.dot(e1.direction, e2.direction));
  }

  private evaluateTangent(entities: Map<string, ConstraintEntity>): number {
    const [e1, e2] = this.getEntities(entities);

    if (e1?.type === 'circle' && e2?.type === 'line') {
      if (!e1.position || !e1.radius || !e2.position || !e2.direction) {
        return Infinity;
      }

      // Distance from circle center to line
      const v = this.subtract(e1.position, e2.position);
      const proj = this.dot(v, e2.direction);
      const perpDist = Math.sqrt(this.dot(v, v) - proj * proj);

      return Math.abs(perpDist - e1.radius);
    }

    return Infinity;
  }

  private evaluateHorizontal(entities: Map<string, ConstraintEntity>): number {
    const [entity] = this.getEntities(entities);
    if (!entity?.direction) return Infinity;

    return Math.abs(entity.direction[1]);
  }

  private evaluateVertical(entities: Map<string, ConstraintEntity>): number {
    const [entity] = this.getEntities(entities);
    if (!entity?.direction) return Infinity;

    return Math.abs(entity.direction[0]);
  }

  private getEntities(entities: Map<string, ConstraintEntity>): ConstraintEntity[] {
    return this.constraint.entities
      .map(id => entities.get(id))
      .filter((e): e is ConstraintEntity => e !== undefined);
  }

  private dot(a: Vec3, b: Vec3): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  private subtract(a: Vec3, b: Vec3): Vec3 {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
}