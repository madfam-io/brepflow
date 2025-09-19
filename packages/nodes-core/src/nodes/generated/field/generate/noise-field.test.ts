
import { describe, it, expect } from 'vitest';
import { NoiseFieldNode } from './noisefield.node';
import { createTestContext } from './../../test-utils';

describe('NoiseFieldNode', () => {
  it('should create NoiseField', async () => {
    const context = createTestContext();
    const inputs = {
      domain: null
    };
    const params = {
      type: "perlin",
      scale: 10,
      octaves: 4,
      persistence: 0.5,
      seed: 0
    };

    const result = await NoiseFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});