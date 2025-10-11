
import { describe, it, expect } from 'vitest';
import { PathPlanningNode } from './path-planning.node';
import { createTestContext } from '../test-utils';

describe('PathPlanningNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      waypoints: undefined
    } as any;
    const params = {
      algorithm: "rrt",
      smoothing: true
    } as any;

    const result = await PathPlanningNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
