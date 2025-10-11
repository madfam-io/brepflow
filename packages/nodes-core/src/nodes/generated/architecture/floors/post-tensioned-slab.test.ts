
import { describe, it, expect } from 'vitest';
import { PostTensionedSlabNode } from './post-tensioned-slab.node';
import { createTestContext } from '../test-utils';

describe('PostTensionedSlabNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      slabOutline: undefined
    } as any;
    const params = {
      slabThickness: 200,
      tendonSpacing: 1200
    } as any;

    const result = await PostTensionedSlabNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
