
import { describe, it, expect } from 'vitest';
import { MedianNode } from './median-node';
import { createTestContext } from '../test-utils';

describe('MedianNode', () => {
  it('should create Median', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      
    };

    const result = await MedianNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.median).toBeDefined();
  });

  
});