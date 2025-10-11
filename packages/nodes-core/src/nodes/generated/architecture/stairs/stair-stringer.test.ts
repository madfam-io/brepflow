
import { describe, it, expect } from 'vitest';
import { StairStringerNode } from './stair-stringer.node';
import { createTestContext } from '../test-utils';

describe('StairStringerNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      stairProfile: undefined
    } as any;
    const params = {
      type: "closed",
      material: "steel",
      depth: 300
    } as any;

    const result = await StairStringerNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
