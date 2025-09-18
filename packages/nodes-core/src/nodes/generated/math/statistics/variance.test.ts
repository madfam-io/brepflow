
import { describe, it, expect } from 'vitest';
import { VarianceNode } from './variance-node';
import { createTestContext } from '../test-utils';

describe('VarianceNode', () => {
  it('should create Variance', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      sample: false
    };

    const result = await VarianceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.variance).toBeDefined();
  });

  
});