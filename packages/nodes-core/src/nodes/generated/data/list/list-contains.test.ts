
import { describe, it, expect } from 'vitest';
import { ListContainsNode } from './listcontains.node';
import { createTestContext } from './../../test-utils';

describe('ListContainsNode', () => {
  it('should create ListContains', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      item: null
    };
    const params = {
      
    };

    const result = await ListContainsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.contains).toBeDefined();
    expect(result.index).toBeDefined();
  });

  
});