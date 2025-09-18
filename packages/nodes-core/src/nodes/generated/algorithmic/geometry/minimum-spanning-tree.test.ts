
import { describe, it, expect } from 'vitest';
import { MinimumSpanningTreeNode } from './minimumspanningtree-node';
import { createTestContext } from '../test-utils';

describe('MinimumSpanningTreeNode', () => {
  it('should create MinimumSpanningTree', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      algorithm: "kruskal",
      showWeights: false
    };

    const result = await MinimumSpanningTreeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tree).toBeDefined();
    expect(result.totalWeight).toBeDefined();
    expect(result.edges).toBeDefined();
  });

  
});