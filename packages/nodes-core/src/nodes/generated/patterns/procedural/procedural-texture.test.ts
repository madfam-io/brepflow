
import { describe, it, expect } from 'vitest';
import { ProceduralTextureNode } from './proceduraltexture-node';
import { createTestContext } from '../test-utils';

describe('ProceduralTextureNode', () => {
  it('should create ProceduralTexture', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      type: "wood",
      scale: 10,
      seed: 0
    };

    const result = await ProceduralTextureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.texture).toBeDefined();
  });

  
});