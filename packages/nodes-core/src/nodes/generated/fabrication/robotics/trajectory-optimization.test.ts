
import { describe, it, expect } from 'vitest';
import { TrajectoryOptimizationNode } from './trajectory-optimization.node';
import { createTestContext } from '../test-utils';

describe('TrajectoryOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      trajectory: undefined
    } as any;
    const params = {
      objective: "time",
      maxVelocity: 1000,
      maxAcceleration: 5000
    } as any;

    const result = await TrajectoryOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
