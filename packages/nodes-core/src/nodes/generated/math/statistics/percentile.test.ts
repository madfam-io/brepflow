
import { describe, it, expect } from 'vitest';
import { PercentileNode } from './percentile.node';
import { createTestContext } from './../../test-utils';

describe('PercentileNode', () => {
  it('should create Percentile', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      percentile: 50
    };

    const result = await PercentileNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});