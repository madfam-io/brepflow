
import { describe, it, expect } from 'vitest';
import { CollisionDetectionNode } from './collisiondetection-node';
import { createTestContext } from '../test-utils';

describe('CollisionDetectionNode', () => {
  it('should create CollisionDetection', async () => {
    const context = createTestContext();
    const inputs = {
      objects: /* test value */
    };
    const params = {
      tolerance: 0.01,
      showCollisions: true
    };

    const result = await CollisionDetectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hasCollisions).toBeDefined();
    expect(result.collidingPairs).toBeDefined();
    expect(result.collisionRegions).toBeDefined();
  });

  
});