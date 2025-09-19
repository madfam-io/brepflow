
import { describe, it, expect } from 'vitest';
import { RetractionOptimizationNode } from './retractionoptimization.node';
import { createTestContext } from './../../test-utils';

describe('RetractionOptimizationNode', () => {
  it('should create RetractionOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: null
    };
    const params = {
      retractionDistance: 1,
      minTravelDistance: 2
    };

    const result = await RetractionOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.retractionPoints).toBeDefined();
  });

  
});