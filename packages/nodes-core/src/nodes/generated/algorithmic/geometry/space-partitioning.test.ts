
import { describe, it, expect } from 'vitest';
import { SpacePartitioningNode } from './space-partitioning.node';
import { createTestContext } from '../test-utils';

describe('SpacePartitioningNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      objects: undefined
    } as any;
    const params = {
      type: "octree",
      maxDepth: 8,
      leafSize: 10
    } as any;

    const result = await SpacePartitioningNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
