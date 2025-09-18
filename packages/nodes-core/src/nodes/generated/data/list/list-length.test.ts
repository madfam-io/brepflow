
import { describe, it, expect } from 'vitest';
import { ListLengthNode } from './listlength-node';
import { createTestContext } from '../test-utils';

describe('ListLengthNode', () => {
  it('should create ListLength', async () => {
    const context = createTestContext();
    const inputs = {
      list: null
    };
    const params = {
      
    };

    const result = await ListLengthNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.length).toBeDefined();
  });

  
});