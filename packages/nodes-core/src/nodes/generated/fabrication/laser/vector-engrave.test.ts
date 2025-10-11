
import { describe, it, expect } from 'vitest';
import { VectorEngraveNode } from './vector-engrave.node';
import { createTestContext } from '../test-utils';

describe('VectorEngraveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      vectors: undefined
    } as any;
    const params = {
      depth: 0.5,
      passes: 1
    } as any;

    const result = await VectorEngraveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
