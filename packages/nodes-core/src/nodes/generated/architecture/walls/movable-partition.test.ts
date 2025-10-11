
import { describe, it, expect } from 'vitest';
import { MovablePartitionNode } from './movable-partition.node';
import { createTestContext } from '../test-utils';

describe('MovablePartitionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      panelWidth: 1200,
      trackType: "ceiling"
    } as any;

    const result = await MovablePartitionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
