
import { describe, it, expect } from 'vitest';
import { ProductNode } from './product.node';
import { createTestContext } from '../test-utils';

describe('ProductNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await ProductNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
