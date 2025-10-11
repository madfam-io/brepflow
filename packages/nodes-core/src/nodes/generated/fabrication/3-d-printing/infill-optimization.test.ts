
import { describe, it, expect } from 'vitest';
import { InfillOptimizationNode } from './infill-optimization.node';
import { createTestContext } from '../test-utils';

describe('InfillOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      minDensity: 0.1,
      maxDensity: 0.5,
      gradientDistance: 5
    } as any;

    const result = await InfillOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
