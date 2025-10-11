
import { describe, it, expect } from 'vitest';
import { SetCartesianProductNode } from './set-cartesian-product.node';
import { createTestContext } from '../test-utils';

describe('SetCartesianProductNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      setA: undefined,
      setB: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetCartesianProductNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
