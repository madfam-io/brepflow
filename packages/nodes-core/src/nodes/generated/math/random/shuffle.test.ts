
import { describe, it, expect } from 'vitest';
import { ShuffleNode } from './shuffle-node';
import { createTestContext } from '../test-utils';

describe('ShuffleNode', () => {
  it('should create Shuffle', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      seed: -1
    };

    const result = await ShuffleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shuffled).toBeDefined();
  });

  
});