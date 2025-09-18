
import { describe, it, expect } from 'vitest';
import { SetDifferenceNode } from './setdifference-node';
import { createTestContext } from '../test-utils';

describe('SetDifferenceNode', () => {
  it('should create SetDifference', async () => {
    const context = createTestContext();
    const inputs = {
      setA: null,
      setB: null
    };
    const params = {
      
    };

    const result = await SetDifferenceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.difference).toBeDefined();
  });

  
});