
import { describe, it, expect } from 'vitest';
import { ListPartitionNode } from './list-partition.node';
import { createTestContext } from '../test-utils';

describe('ListPartitionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      size: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListPartitionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
