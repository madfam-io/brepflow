
import { describe, it, expect } from 'vitest';
import { CutOrderOptimizationNode } from './cut-order-optimization.node';
import { createTestContext } from '../test-utils';

describe('CutOrderOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      paths: undefined
    } as any;
    const params = {
      innerFirst: true,
      minimizeTravel: true
    } as any;

    const result = await CutOrderOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
