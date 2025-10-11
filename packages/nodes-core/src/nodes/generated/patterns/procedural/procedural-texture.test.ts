
import { describe, it, expect } from 'vitest';
import { ProceduralTextureNode } from './procedural-texture.node';
import { createTestContext } from '../test-utils';

describe('ProceduralTextureNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      type: "wood",
      scale: 10,
      seed: 0
    } as any;

    const result = await ProceduralTextureNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
