
import { describe, it, expect } from 'vitest';
import { JointLimitAvoidanceNode } from './jointlimitavoidance-node';
import { createTestContext } from '../test-utils';

describe('JointLimitAvoidanceNode', () => {
  it('should create JointLimitAvoidance', async () => {
    const context = createTestContext();
    const inputs = {
      jointTrajectory: /* test value */
    };
    const params = {
      margin: 5
    };

    const result = await JointLimitAvoidanceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.safeTrajectory).toBeDefined();
  });

  
});