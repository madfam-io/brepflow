
import { describe, it, expect } from 'vitest';
import { CantorSetNode } from './cantor-set.node';
import { createTestContext } from '../test-utils';

describe('CantorSetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      segment: undefined
    } as any;
    const params = {
      iterations: 5,
      ratio: 0.333
    } as any;

    const result = await CantorSetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
