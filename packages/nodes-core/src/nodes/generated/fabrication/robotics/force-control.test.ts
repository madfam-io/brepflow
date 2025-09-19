
import { describe, it, expect } from 'vitest';
import { ForceControlNode } from './forcecontrol.node';
import { createTestContext } from './../../test-utils';

describe('ForceControlNode', () => {
  it('should create ForceControl', async () => {
    const context = createTestContext();
    const inputs = {
      contactSurface: null
    };
    const params = {
      forceLimit: 100,
      compliance: 0.5
    };

    const result = await ForceControlNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.forceProfile).toBeDefined();
  });

  
});