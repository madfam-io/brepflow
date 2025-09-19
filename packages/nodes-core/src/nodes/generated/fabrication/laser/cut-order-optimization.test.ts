
import { describe, it, expect } from 'vitest';
import { CutOrderOptimizationNode } from './cutorderoptimization.node';
import { createTestContext } from './../../test-utils';

describe('CutOrderOptimizationNode', () => {
  it('should create CutOrderOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      paths: null
    };
    const params = {
      innerFirst: true,
      minimizeTravel: true
    };

    const result = await CutOrderOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.orderedPaths).toBeDefined();
    expect(result.travelPath).toBeDefined();
  });

  
});