
import { describe, it, expect } from 'vitest';
import { PierceOptimizationNode } from './pierce-optimization.node';
import { createTestContext } from '../test-utils';

describe('PierceOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      closedPaths: undefined
    } as any;
    const params = {
      preferCorners: true,
      minEdgeDistance: 2
    } as any;

    const result = await PierceOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
