
import { describe, it, expect } from 'vitest';
import { MotionDriverNode } from './motiondriver.node';
import { createTestContext } from './../../test-utils';

describe('MotionDriverNode', () => {
  it('should create MotionDriver', async () => {
    const context = createTestContext();
    const inputs = {
      joint: null
    };
    const params = {
      motionType: "constant",
      velocity: 1,
      acceleration: 0,
      period: 1
    };

    const result = await MotionDriverNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.drivenJoint).toBeDefined();
  });

  
});