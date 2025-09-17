// Re-export constraint creation utilities for convenience
export { ConstraintSolver } from './solver';

export const createCoincidentConstraint = ConstraintSolver.coincident;
export const createParallelConstraint = ConstraintSolver.parallel;
export const createPerpendicularConstraint = ConstraintSolver.perpendicular;
export const createDistanceConstraint = ConstraintSolver.distance;
export const createAngleConstraint = ConstraintSolver.angle;
export const createRadiusConstraint = ConstraintSolver.radius;
export const createHorizontalConstraint = ConstraintSolver.horizontal;
export const createVerticalConstraint = ConstraintSolver.vertical;
export const createTangentConstraint = ConstraintSolver.tangent;
export const createEqualConstraint = ConstraintSolver.equal;
export const createFixedConstraint = ConstraintSolver.fixed;