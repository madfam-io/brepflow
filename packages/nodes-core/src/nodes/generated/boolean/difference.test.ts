
import { describe, it, expect } from 'vitest';
import { DifferenceNode } from './difference.node';
import { createTestContext } from '../test-utils';

describe('DifferenceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      base: undefined,
      tools: undefined
    } as any;
    const params = {
      keepOriginals: false,
      fuzzyValue: 1e-7
    } as any;

    const result = await DifferenceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
