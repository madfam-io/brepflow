
import { describe, it, expect } from 'vitest';
import { SetCartesianProductNode } from './setcartesianproduct-node';
import { createTestContext } from '../test-utils';

describe('SetCartesianProductNode', () => {
  it('should create SetCartesianProduct', async () => {
    const context = createTestContext();
    const inputs = {
      setA: null,
      setB: null
    };
    const params = {
      
    };

    const result = await SetCartesianProductNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.product).toBeDefined();
  });

  
});