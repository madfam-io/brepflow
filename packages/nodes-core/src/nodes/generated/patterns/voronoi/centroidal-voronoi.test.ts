
import { describe, it, expect } from 'vitest';
import { CentroidalVoronoiNode } from './centroidal-voronoi.node';
import { createTestContext } from '../test-utils';

describe('CentroidalVoronoiNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      iterations: 10,
      convergence: 0.001
    } as any;

    const result = await CentroidalVoronoiNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
