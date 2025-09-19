
import { describe, it, expect } from 'vitest';
import { SetSymmetricDifferenceNode } from './setsymmetricdifference.node';
import { createTestContext } from './../../test-utils';

describe('SetSymmetricDifferenceNode', () => {
  it('should create SetSymmetricDifference', async () => {
    const context = createTestContext();
    const inputs = {
      setA: null,
      setB: null
    };
    const params = {
      
    };

    const result = await SetSymmetricDifferenceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.difference).toBeDefined();
  });

  
});