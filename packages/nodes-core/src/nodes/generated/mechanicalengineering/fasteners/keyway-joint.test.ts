
import { describe, it, expect } from 'vitest';
import { KeywayJointNode } from './keywayjoint.node';
import { createTestContext } from './../../test-utils';

describe('KeywayJointNode', () => {
  it('should create KeywayJoint', async () => {
    const context = createTestContext();
    const inputs = {
      shaftCenter: null
    };
    const params = {
      shaftDiameter: 20,
      keyWidth: 6,
      keyHeight: 6,
      keyLength: 25
    };

    const result = await KeywayJointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shaft).toBeDefined();
    expect(result.key).toBeDefined();
    expect(result.keyway).toBeDefined();
  });

  
});