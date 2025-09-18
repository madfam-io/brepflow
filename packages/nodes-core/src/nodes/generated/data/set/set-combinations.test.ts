
import { describe, it, expect } from 'vitest';
import { SetCombinationsNode } from './setcombinations-node';
import { createTestContext } from '../test-utils';

describe('SetCombinationsNode', () => {
  it('should create SetCombinations', async () => {
    const context = createTestContext();
    const inputs = {
      set: null
    };
    const params = {
      k: 2
    };

    const result = await SetCombinationsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.combinations).toBeDefined();
  });

  
});