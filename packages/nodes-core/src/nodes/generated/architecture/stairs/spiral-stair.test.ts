
import { describe, it, expect } from 'vitest';
import { SpiralStairNode } from './spiralstair-node';
import { createTestContext } from '../test-utils';

describe('SpiralStairNode', () => {
  it('should create SpiralStair', async () => {
    const context = createTestContext();
    const inputs = {
      centerPoint: /* test value */
    };
    const params = {
      diameter: 2000,
      totalRise: 3000,
      rotation: 360,
      centerPole: true
    };

    const result = await SpiralStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spiralStair).toBeDefined();
    expect(result.centerPole).toBeDefined();
  });

  
});