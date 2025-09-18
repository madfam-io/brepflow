
import { describe, it, expect } from 'vitest';
import { SpacePartitioningNode } from './spacepartitioning-node';
import { createTestContext } from '../test-utils';

describe('SpacePartitioningNode', () => {
  it('should create SpacePartitioning', async () => {
    const context = createTestContext();
    const inputs = {
      objects: /* test value */
    };
    const params = {
      type: "octree",
      maxDepth: 8,
      leafSize: 10
    };

    const result = await SpacePartitioningNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.structure).toBeDefined();
    expect(result.stats).toBeDefined();
    expect(result.visualization).toBeDefined();
  });

  
});