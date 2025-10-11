
import { describe, it, expect } from 'vitest';
import { MedianNode } from './median.node';
import { createTestContext } from '../test-utils';

describe('MedianNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await MedianNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
