
import { describe, it, expect } from 'vitest';
import { ProductNode } from './product.node';
import { createTestContext } from './../../test-utils';

describe('ProductNode', () => {
  it('should create Product', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      
    };

    const result = await ProductNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.product).toBeDefined();
  });

  
});