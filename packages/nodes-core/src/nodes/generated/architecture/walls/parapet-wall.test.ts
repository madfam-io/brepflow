
import { describe, it, expect } from 'vitest';
import { ParapetWallNode } from './parapet-wall.node';
import { createTestContext } from '../test-utils';

describe('ParapetWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      roofEdge: undefined
    } as any;
    const params = {
      height: 1000,
      coping: true,
      copingOverhang: 50
    } as any;

    const result = await ParapetWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
