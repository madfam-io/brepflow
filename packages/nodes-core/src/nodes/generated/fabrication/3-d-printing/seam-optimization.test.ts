
import { describe, it, expect } from 'vitest';
import { SeamOptimizationNode } from './seam-optimization.node';
import { createTestContext } from '../test-utils';

describe('SeamOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      slices: undefined
    } as any;
    const params = {
      strategy: "hidden"
    } as any;

    const result = await SeamOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
