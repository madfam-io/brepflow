
import { describe, it, expect } from 'vitest';
import { ListFilterNode } from './listfilter-node';
import { createTestContext } from '../test-utils';

describe('ListFilterNode', () => {
  it('should create ListFilter', async () => {
    const context = createTestContext();
    const inputs = {
      list: /* test value */,
      mask: /* test value */
    };
    const params = {
      
    };

    const result = await ListFilterNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.filtered).toBeDefined();
  });

  
});