
import { describe, it, expect } from 'vitest';
import { SetPermutationsNode } from './setpermutations-node';
import { createTestContext } from '../test-utils';

describe('SetPermutationsNode', () => {
  it('should create SetPermutations', async () => {
    const context = createTestContext();
    const inputs = {
      set: /* test value */
    };
    const params = {
      k: -1
    };

    const result = await SetPermutationsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.permutations).toBeDefined();
  });

  
});