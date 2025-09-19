
import { describe, it, expect } from 'vitest';
import { ListInsertNode } from './listinsert.node';
import { createTestContext } from './../../test-utils';

describe('ListInsertNode', () => {
  it('should create ListInsert', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      item: null,
      index: null
    };
    const params = {
      
    };

    const result = await ListInsertNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});