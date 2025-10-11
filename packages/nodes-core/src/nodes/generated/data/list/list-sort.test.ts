
import { describe, it, expect } from 'vitest';
import { ListSortNode } from './list-sort.node';
import { createTestContext } from '../test-utils';

describe('ListSortNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined
    } as any;
    const params = {
      ascending: true
    } as any;

    const result = await ListSortNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
