
import { describe, it, expect } from 'vitest';
import { KMeansClusteringNode } from './kmeans-clustering.node';
import { createTestContext } from '../test-utils';

describe('KMeansClusteringNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {
      clusters: 3,
      maxIterations: 100,
      tolerance: 0.001,
      randomSeed: 42
    } as any;

    const result = await KMeansClusteringNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
