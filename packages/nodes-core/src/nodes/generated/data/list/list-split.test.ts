
import { describe, it, expect } from 'vitest';
import { ListSplitNode } from './list-split.node';
import { createTestContext } from '../test-utils';

describe('ListSplitNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      index: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListSplitNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
