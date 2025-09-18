
import { describe, it, expect } from 'vitest';
import { TrajectoryOptimizationNode } from './trajectoryoptimization-node';
import { createTestContext } from '../test-utils';

describe('TrajectoryOptimizationNode', () => {
  it('should create TrajectoryOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      trajectory: null
    };
    const params = {
      objective: "time",
      maxVelocity: 1000,
      maxAcceleration: 5000
    };

    const result = await TrajectoryOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.optimizedTrajectory).toBeDefined();
    expect(result.velocityProfile).toBeDefined();
  });

  
});