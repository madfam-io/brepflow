
import { describe, it, expect } from 'vitest';
import { CollisionDetectionNode } from './collisiondetection.node';
import { createTestContext } from './../../test-utils';

describe('CollisionDetectionNode', () => {
  it('should create CollisionDetection', async () => {
    const context = createTestContext();
    const inputs = {
      bodies: null
    };
    const params = {
      detectionType: "discrete",
      tolerance: 0.1,
      includeSelfCollision: true
    };

    const result = await CollisionDetectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.collisionPairs).toBeDefined();
  });

  
});