
import { describe, it, expect } from 'vitest';
import { CollisionAvoidanceNode } from './collisionavoidance-node';
import { createTestContext } from '../test-utils';

describe('CollisionAvoidanceNode', () => {
  it('should create CollisionAvoidance', async () => {
    const context = createTestContext();
    const inputs = {
      robotPath: null,
      environment: null
    };
    const params = {
      safetyMargin: 10
    };

    const result = await CollisionAvoidanceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.safePath).toBeDefined();
    expect(result.collisionPoints).toBeDefined();
  });

  
});