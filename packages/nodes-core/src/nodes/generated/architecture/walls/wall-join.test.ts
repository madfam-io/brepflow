
import { describe, it, expect } from 'vitest';
import { WallJoinNode } from './walljoin-node';
import { createTestContext } from '../test-utils';

describe('WallJoinNode', () => {
  it('should create WallJoin', async () => {
    const context = createTestContext();
    const inputs = {
      wall1: null,
      wall2: null
    };
    const params = {
      joinType: "miter"
    };

    const result = await WallJoinNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joinedWalls).toBeDefined();
  });

  
});