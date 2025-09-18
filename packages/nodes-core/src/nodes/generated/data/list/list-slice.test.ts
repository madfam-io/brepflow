
import { describe, it, expect } from 'vitest';
import { ListSliceNode } from './listslice-node';
import { createTestContext } from '../test-utils';

describe('ListSliceNode', () => {
  it('should create ListSlice', async () => {
    const context = createTestContext();
    const inputs = {
      list: /* test value */,
      start: /* test value */
    };
    const params = {
      
    };

    const result = await ListSliceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sublist).toBeDefined();
  });

  
});