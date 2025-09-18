
import { describe, it, expect } from 'vitest';
import { KMeansClusteringNode } from './kmeansclustering-node';
import { createTestContext } from '../test-utils';

describe('KMeansClusteringNode', () => {
  it('should create KMeansClustering', async () => {
    const context = createTestContext();
    const inputs = {
      data: /* test value */
    };
    const params = {
      clusters: 3,
      maxIterations: 100,
      tolerance: 0.001,
      randomSeed: 42
    };

    const result = await KMeansClusteringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.centroids).toBeDefined();
    expect(result.labels).toBeDefined();
    expect(result.clusters).toBeDefined();
    expect(result.inertia).toBeDefined();
  });

  
});