
import { describe, it, expect } from 'vitest';
import { VarianceNode } from './variance.node';
import { createTestContext } from '../test-utils';

describe('VarianceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {
      sample: false
    } as any;

    const result = await VarianceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
