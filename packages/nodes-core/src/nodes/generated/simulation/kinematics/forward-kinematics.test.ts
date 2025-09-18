
import { describe, it, expect } from 'vitest';
import { ForwardKinematicsNode } from './forwardkinematics-node';
import { createTestContext } from '../test-utils';

describe('ForwardKinematicsNode', () => {
  it('should create ForwardKinematics', async () => {
    const context = createTestContext();
    const inputs = {
      mechanism: /* test value */,
      jointValues: /* test value */
    };
    const params = {
      timeStep: 0.01,
      duration: 1
    };

    const result = await ForwardKinematicsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.endEffectorPose).toBeDefined();
    expect(result.trajectory).toBeDefined();
  });

  
});