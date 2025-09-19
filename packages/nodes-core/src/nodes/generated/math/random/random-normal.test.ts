
import { describe, it, expect } from 'vitest';
import { RandomNormalNode } from './randomnormal.node';
import { createTestContext } from './../../test-utils';

describe('RandomNormalNode', () => {
  it('should create RandomNormal', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      mean: 0,
      stddev: 1,
      seed: -1
    };

    const result = await RandomNormalNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.value).toBeDefined();
  });

  
});