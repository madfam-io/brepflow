
import { describe, it, expect } from 'vitest';
import { ListShuffleNode } from './list-shuffle.node';
import { createTestContext } from '../test-utils';

describe('ListShuffleNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined
    } as any;
    const params = {
      seed: -1
    } as any;

    const result = await ListShuffleNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
