
import { describe, it, expect } from 'vitest';
import { ListShuffleNode } from './listshuffle-node';
import { createTestContext } from '../test-utils';

describe('ListShuffleNode', () => {
  it('should create ListShuffle', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      seed: -1
    };

    const result = await ListShuffleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shuffled).toBeDefined();
  });

  
});