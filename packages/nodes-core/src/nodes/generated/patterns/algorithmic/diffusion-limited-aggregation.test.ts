
import { describe, it, expect } from 'vitest';
import { DiffusionLimitedAggregationNode } from './diffusionlimitedaggregation-node';
import { createTestContext } from '../test-utils';

describe('DiffusionLimitedAggregationNode', () => {
  it('should create DiffusionLimitedAggregation', async () => {
    const context = createTestContext();
    const inputs = {
      seed: /* test value */
    };
    const params = {
      particles: 1000,
      stickiness: 1
    };

    const result = await DiffusionLimitedAggregationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.aggregate).toBeDefined();
  });

  
});