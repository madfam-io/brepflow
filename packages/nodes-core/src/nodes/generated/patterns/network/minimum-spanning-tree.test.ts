
import { describe, it, expect } from 'vitest';
import { MinimumSpanningTreeNode } from './minimumspanningtree-node';
import { createTestContext } from '../test-utils';

describe('MinimumSpanningTreeNode', () => {
  it('should create MinimumSpanningTree', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */
    };
    const params = {
      
    };

    const result = await MinimumSpanningTreeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tree).toBeDefined();
  });

  
});