
import { describe, it, expect } from 'vitest';
import { StraightRampNode } from './straightramp.node';
import { createTestContext } from './../../test-utils';

describe('StraightRampNode', () => {
  it('should create StraightRamp', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null,
      endPoint: null
    };
    const params = {
      slope: 0.083,
      width: 1200,
      handrails: true
    };

    const result = await StraightRampNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.ramp).toBeDefined();
    expect(result.handrails).toBeDefined();
  });

  
});