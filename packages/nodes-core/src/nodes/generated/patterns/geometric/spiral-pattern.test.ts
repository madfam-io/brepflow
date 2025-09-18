
import { describe, it, expect } from 'vitest';
import { SpiralPatternNode } from './spiralpattern-node';
import { createTestContext } from '../test-utils';

describe('SpiralPatternNode', () => {
  it('should create SpiralPattern', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      spiralType: "logarithmic",
      turns: 5,
      growth: 1.2
    };

    const result = await SpiralPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spiral).toBeDefined();
  });

  
});