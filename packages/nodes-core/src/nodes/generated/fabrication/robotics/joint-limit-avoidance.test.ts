
import { describe, it, expect } from 'vitest';
import { JointLimitAvoidanceNode } from './joint-limit-avoidance.node';
import { createTestContext } from '../test-utils';

describe('JointLimitAvoidanceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      jointTrajectory: undefined
    } as any;
    const params = {
      margin: 5
    } as any;

    const result = await JointLimitAvoidanceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
