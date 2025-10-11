
import { describe, it, expect } from 'vitest';
import { ParallelNode } from './parallel.node';
import { createTestContext } from '../test-utils';

describe('ParallelNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: undefined,
      entity2: undefined
    } as any;
    const params = {
      offset: 0,
      flip: false
    } as any;

    const result = await ParallelNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
