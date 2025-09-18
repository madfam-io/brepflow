
import { describe, it, expect } from 'vitest';
import { MovablePartitionNode } from './movablepartition-node';
import { createTestContext } from '../test-utils';

describe('MovablePartitionNode', () => {
  it('should create MovablePartition', async () => {
    const context = createTestContext();
    const inputs = {
      path: /* test value */
    };
    const params = {
      panelWidth: 1200,
      trackType: "ceiling"
    };

    const result = await MovablePartitionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.partition).toBeDefined();
    expect(result.track).toBeDefined();
  });

  
});