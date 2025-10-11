
import { describe, it, expect } from 'vitest';
import { CollisionDetectionNode } from './collision-detection.node';
import { createTestContext } from '../test-utils';

describe('CollisionDetectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      bodies: undefined
    } as any;
    const params = {
      detectionType: "discrete",
      tolerance: 0.1,
      includeSelfCollision: true
    } as any;

    const result = await CollisionDetectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
