
import { describe, it, expect } from 'vitest';
import { ListReplaceNode } from './listreplace.node';
import { createTestContext } from './../../test-utils';

describe('ListReplaceNode', () => {
  it('should create ListReplace', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      item: null,
      index: null
    };
    const params = {
      
    };

    const result = await ListReplaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});