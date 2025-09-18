
import { describe, it, expect } from 'vitest';
import { ListFlattenNode } from './listflatten-node';
import { createTestContext } from '../test-utils';

describe('ListFlattenNode', () => {
  it('should create ListFlatten', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      depth: 1
    };

    const result = await ListFlattenNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.flattened).toBeDefined();
  });

  
});