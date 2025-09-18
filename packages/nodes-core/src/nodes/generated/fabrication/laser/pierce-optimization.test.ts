
import { describe, it, expect } from 'vitest';
import { PierceOptimizationNode } from './pierceoptimization-node';
import { createTestContext } from '../test-utils';

describe('PierceOptimizationNode', () => {
  it('should create PierceOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      closedPaths: null
    };
    const params = {
      preferCorners: true,
      minEdgeDistance: 2
    };

    const result = await PierceOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.piercePoints).toBeDefined();
  });

  
});