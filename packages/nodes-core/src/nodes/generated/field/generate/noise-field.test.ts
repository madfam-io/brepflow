
import { describe, it, expect } from 'vitest';
import { NoiseFieldNode } from './noise-field.node';
import { createTestContext } from '../test-utils';

describe('NoiseFieldNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      domain: undefined
    } as any;
    const params = {
      type: "perlin",
      scale: 10,
      octaves: 4,
      persistence: 0.5,
      seed: 0
    } as any;

    const result = await NoiseFieldNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
