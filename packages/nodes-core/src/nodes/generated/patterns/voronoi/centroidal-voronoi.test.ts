
import { describe, it, expect } from 'vitest';
import { CentroidalVoronoiNode } from './centroidalvoronoi-node';
import { createTestContext } from '../test-utils';

describe('CentroidalVoronoiNode', () => {
  it('should create CentroidalVoronoi', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */
    };
    const params = {
      iterations: 10,
      convergence: 0.001
    };

    const result = await CentroidalVoronoiNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cells).toBeDefined();
    expect(result.centroids).toBeDefined();
  });

  
});