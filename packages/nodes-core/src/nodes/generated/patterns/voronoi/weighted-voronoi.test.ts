
import { describe, it, expect } from 'vitest';
import { WeightedVoronoiNode } from './weightedvoronoi.node';
import { createTestContext } from './../../test-utils';

describe('WeightedVoronoiNode', () => {
  it('should create WeightedVoronoi', async () => {
    const context = createTestContext();
    const inputs = {
      points: null,
      weights: null
    };
    const params = {
      powerExponent: 2
    };

    const result = await WeightedVoronoiNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cells).toBeDefined();
  });

  
});