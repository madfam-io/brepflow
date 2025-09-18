
import { describe, it, expect } from 'vitest';
import { InfillOptimizationNode } from './infilloptimization-node';
import { createTestContext } from '../test-utils';

describe('InfillOptimizationNode', () => {
  it('should create InfillOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      minDensity: 0.1,
      maxDensity: 0.5,
      gradientDistance: 5
    };

    const result = await InfillOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.adaptiveInfill).toBeDefined();
  });

  
});