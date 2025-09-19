
import { describe, it, expect } from 'vitest';
import { SetPartitionsNode } from './setpartitions.node';
import { createTestContext } from './../../test-utils';

describe('SetPartitionsNode', () => {
  it('should create SetPartitions', async () => {
    const context = createTestContext();
    const inputs = {
      set: null
    };
    const params = {
      k: 2
    };

    const result = await SetPartitionsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.partitions).toBeDefined();
  });

  
});