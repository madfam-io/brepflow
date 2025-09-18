
import { describe, it, expect } from 'vitest';
import { ListSplitNode } from './listsplit-node';
import { createTestContext } from '../test-utils';

describe('ListSplitNode', () => {
  it('should create ListSplit', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      index: null
    };
    const params = {
      
    };

    const result = await ListSplitNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.before).toBeDefined();
    expect(result.after).toBeDefined();
  });

  
});