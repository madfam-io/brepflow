
import { describe, it, expect } from 'vitest';
import { ListUniqueNode } from './listunique.node';
import { createTestContext } from './../../test-utils';

describe('ListUniqueNode', () => {
  it('should create ListUnique', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      
    };

    const result = await ListUniqueNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.unique).toBeDefined();
  });

  
});