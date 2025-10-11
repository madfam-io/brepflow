
import { describe, it, expect } from 'vitest';
import { ShuffleNode } from './shuffle.node';
import { createTestContext } from '../test-utils';

describe('ShuffleNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined
    } as any;
    const params = {
      seed: -1
    } as any;

    const result = await ShuffleNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
