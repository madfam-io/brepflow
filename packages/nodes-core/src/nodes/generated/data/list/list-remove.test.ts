
import { describe, it, expect } from 'vitest';
import { ListRemoveNode } from './listremove-node';
import { createTestContext } from '../test-utils';

describe('ListRemoveNode', () => {
  it('should create ListRemove', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      index: null
    };
    const params = {
      
    };

    const result = await ListRemoveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.removed).toBeDefined();
  });

  
});