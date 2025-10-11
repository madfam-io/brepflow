
import { describe, it, expect } from 'vitest';
import { WallJoinNode } from './wall-join.node';
import { createTestContext } from '../test-utils';

describe('WallJoinNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wall1: undefined,
      wall2: undefined
    } as any;
    const params = {
      joinType: "miter"
    } as any;

    const result = await WallJoinNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
