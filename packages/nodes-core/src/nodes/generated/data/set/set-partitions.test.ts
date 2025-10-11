
import { describe, it, expect } from 'vitest';
import { SetPartitionsNode } from './set-partitions.node';
import { createTestContext } from '../test-utils';

describe('SetPartitionsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      set: undefined
    } as any;
    const params = {
      k: 2
    } as any;

    const result = await SetPartitionsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
