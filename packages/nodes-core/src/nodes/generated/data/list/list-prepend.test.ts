
import { describe, it, expect } from 'vitest';
import { ListPrependNode } from './listprepend-node';
import { createTestContext } from '../test-utils';

describe('ListPrependNode', () => {
  it('should create ListPrepend', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      item: null
    };
    const params = {
      
    };

    const result = await ListPrependNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});