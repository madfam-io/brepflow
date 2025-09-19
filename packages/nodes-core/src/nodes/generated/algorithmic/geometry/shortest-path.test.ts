
import { describe, it, expect } from 'vitest';
import { ShortestPathNode } from './shortestpath.node';
import { createTestContext } from './../../test-utils';

describe('ShortestPathNode', () => {
  it('should create ShortestPath', async () => {
    const context = createTestContext();
    const inputs = {
      graph: null,
      start: null,
      end: null
    };
    const params = {
      algorithm: "dijkstra",
      heuristic: "euclidean"
    };

    const result = await ShortestPathNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.path).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.nodes).toBeDefined();
  });

  
});