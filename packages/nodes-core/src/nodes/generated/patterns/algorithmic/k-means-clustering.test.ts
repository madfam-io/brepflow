
import { describe, it, expect } from 'vitest';
import { KMeansClusteringNode } from './kmeansclustering-node';
import { createTestContext } from '../test-utils';

describe('KMeansClusteringNode', () => {
  it('should create KMeansClustering', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      k: 5,
      iterations: 100
    };

    const result = await KMeansClusteringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.clusters).toBeDefined();
    expect(result.centroids).toBeDefined();
  });

  
});