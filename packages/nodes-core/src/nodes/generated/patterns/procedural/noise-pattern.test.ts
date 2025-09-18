
import { describe, it, expect } from 'vitest';
import { NoisePatternNode } from './noisepattern-node';
import { createTestContext } from '../test-utils';

describe('NoisePatternNode', () => {
  it('should create NoisePattern', async () => {
    const context = createTestContext();
    const inputs = {
      domain: null
    };
    const params = {
      noiseType: "perlin",
      octaves: 4,
      frequency: 1,
      amplitude: 1
    };

    const result = await NoisePatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.noiseField).toBeDefined();
  });

  
});