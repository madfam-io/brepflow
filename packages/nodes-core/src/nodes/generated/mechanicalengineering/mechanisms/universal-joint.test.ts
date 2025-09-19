
import { describe, it, expect } from 'vitest';
import { UniversalJointNode } from './universaljoint.node';
import { createTestContext } from './../../test-utils';

describe('UniversalJointNode', () => {
  it('should create UniversalJoint', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      yokeDiameter: 30,
      crossPinDiameter: 8,
      length: 60,
      angle: 0
    };

    const result = await UniversalJointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
    expect(result.yokes).toBeDefined();
    expect(result.cross).toBeDefined();
  });

  
});