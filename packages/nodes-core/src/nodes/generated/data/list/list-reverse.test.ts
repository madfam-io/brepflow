
import { describe, it, expect } from 'vitest';
import { ListReverseNode } from './listreverse-node';
import { createTestContext } from '../test-utils';

describe('ListReverseNode', () => {
  it('should create ListReverse', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      
    };

    const result = await ListReverseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.reversed).toBeDefined();
  });

  
});