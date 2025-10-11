
import { describe, it, expect } from 'vitest';
import { SetCombinationsNode } from './set-combinations.node';
import { createTestContext } from '../test-utils';

describe('SetCombinationsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      set: undefined
    } as any;
    const params = {
      k: 2
    } as any;

    const result = await SetCombinationsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
