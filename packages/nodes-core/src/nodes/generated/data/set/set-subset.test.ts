
import { describe, it, expect } from 'vitest';
import { SetSubsetNode } from './setsubset-node';
import { createTestContext } from '../test-utils';

describe('SetSubsetNode', () => {
  it('should create SetSubset', async () => {
    const context = createTestContext();
    const inputs = {
      setA: null,
      setB: null
    };
    const params = {
      
    };

    const result = await SetSubsetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isSubset).toBeDefined();
  });

  
});