
import { describe, it, expect } from 'vitest';
import { ListSliceNode } from './listslice.node';
import { createTestContext } from './../../test-utils';

describe('ListSliceNode', () => {
  it('should create ListSlice', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      start: null
    };
    const params = {
      
    };

    const result = await ListSliceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sublist).toBeDefined();
  });

  
});