
import { describe, it, expect } from 'vitest';
import { CollisionDetectionNode } from './collision-detection.node';
import { createTestContext } from '../test-utils';

describe('CollisionDetectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: undefined,
      model: undefined
    } as any;
    const params = {
      toolLength: 50,
      holderDiameter: 20
    } as any;

    const result = await CollisionDetectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
