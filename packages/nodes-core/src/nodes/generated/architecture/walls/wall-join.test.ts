
import { describe, it, expect } from 'vitest';
import { WallJoinNode } from './walljoin-node';
import { createTestContext } from '../test-utils';

describe('WallJoinNode', () => {
  it('should create WallJoin', async () => {
    const context = createTestContext();
    const inputs = {
      wall1: /* test value */,
      wall2: /* test value */
    };
    const params = {
      joinType: "miter"
    };

    const result = await WallJoinNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joinedWalls).toBeDefined();
  });

  
});