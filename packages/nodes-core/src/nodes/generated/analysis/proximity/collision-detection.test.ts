
import { describe, it, expect } from 'vitest';
import { CollisionDetectionNode } from './collision-detection.node';
import { createTestContext } from '../test-utils';

describe('CollisionDetectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      objects: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      showCollisions: true
    } as any;

    const result = await CollisionDetectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
