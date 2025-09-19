
import { describe, it, expect } from 'vitest';
import { ListSortNode } from './listsort.node';
import { createTestContext } from './../../test-utils';

describe('ListSortNode', () => {
  it('should create ListSort', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      ascending: true
    };

    const result = await ListSortNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sorted).toBeDefined();
    expect(result.indices).toBeDefined();
  });

  
});