
import { describe, it, expect } from 'vitest';
import { SetPermutationsNode } from './set-permutations.node';
import { createTestContext } from '../test-utils';

describe('SetPermutationsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      set: undefined
    } as any;
    const params = {
      k: -1
    } as any;

    const result = await SetPermutationsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
