
import { describe, it, expect } from 'vitest';
import { ShortestPathNode } from './shortest-path.node';
import { createTestContext } from '../test-utils';

describe('ShortestPathNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      graph: undefined,
      start: undefined,
      end: undefined
    } as any;
    const params = {
      algorithm: "dijkstra",
      heuristic: "euclidean"
    } as any;

    const result = await ShortestPathNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
