
import { describe, it, expect } from 'vitest';
import { CollisionDetectionNode } from './collisiondetection.node';
import { createTestContext } from './../../test-utils';

describe('CollisionDetectionNode', () => {
  it('should create CollisionDetection', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: null,
      model: null
    };
    const params = {
      toolLength: 50,
      holderDiameter: 20
    };

    const result = await CollisionDetectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.collisions).toBeDefined();
    expect(result.safePath).toBeDefined();
  });

  
});