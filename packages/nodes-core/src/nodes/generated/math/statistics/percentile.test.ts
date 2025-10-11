
import { describe, it, expect } from 'vitest';
import { PercentileNode } from './percentile.node';
import { createTestContext } from '../test-utils';

describe('PercentileNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {
      percentile: 50
    } as any;

    const result = await PercentileNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
