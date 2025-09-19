
import { describe, it, expect } from 'vitest';
import { ListPartitionNode } from './listpartition.node';
import { createTestContext } from './../../test-utils';

describe('ListPartitionNode', () => {
  it('should create ListPartition', async () => {
    const context = createTestContext();
    const inputs = {
      list: null,
      size: null
    };
    const params = {
      
    };

    const result = await ListPartitionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.partitions).toBeDefined();
  });

  
});