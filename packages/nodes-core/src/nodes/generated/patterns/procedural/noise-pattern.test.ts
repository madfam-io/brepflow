
import { describe, it, expect } from 'vitest';
import { NoisePatternNode } from './noise-pattern.node';
import { createTestContext } from '../test-utils';

describe('NoisePatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      domain: undefined
    } as any;
    const params = {
      noiseType: "perlin",
      octaves: 4,
      frequency: 1,
      amplitude: 1
    } as any;

    const result = await NoisePatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
