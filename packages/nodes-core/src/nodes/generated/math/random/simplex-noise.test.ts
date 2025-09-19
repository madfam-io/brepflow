
import { describe, it, expect } from 'vitest';
import { SimplexNoiseNode } from './simplexnoise.node';
import { createTestContext } from './../../test-utils';

describe('SimplexNoiseNode', () => {
  it('should create SimplexNoise', async () => {
    const context = createTestContext();
    const inputs = {
      x: null
    };
    const params = {
      scale: 1,
      seed: -1
    };

    const result = await SimplexNoiseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.noise).toBeDefined();
  });

  
});