
import { describe, it, expect } from 'vitest';
import { PathPlanningNode } from './pathplanning-node';
import { createTestContext } from '../test-utils';

describe('PathPlanningNode', () => {
  it('should create PathPlanning', async () => {
    const context = createTestContext();
    const inputs = {
      waypoints: null
    };
    const params = {
      algorithm: "rrt",
      smoothing: true
    };

    const result = await PathPlanningNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trajectory).toBeDefined();
    expect(result.jointTrajectory).toBeDefined();
  });

  
});