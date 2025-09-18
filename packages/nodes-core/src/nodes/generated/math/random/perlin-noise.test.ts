
import { describe, it, expect } from 'vitest';
import { PerlinNoiseNode } from './perlinnoise-node';
import { createTestContext } from '../test-utils';

describe('PerlinNoiseNode', () => {
  it('should create PerlinNoise', async () => {
    const context = createTestContext();
    const inputs = {
      x: null
    };
    const params = {
      octaves: 4,
      persistence: 0.5,
      seed: -1
    };

    const result = await PerlinNoiseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.noise).toBeDefined();
  });

  
});