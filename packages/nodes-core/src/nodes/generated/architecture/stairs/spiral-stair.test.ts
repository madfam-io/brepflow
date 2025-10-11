
import { describe, it, expect } from 'vitest';
import { SpiralStairNode } from './spiral-stair.node';
import { createTestContext } from '../test-utils';

describe('SpiralStairNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      centerPoint: undefined
    } as any;
    const params = {
      diameter: 2000,
      totalRise: 3000,
      rotation: 360,
      centerPole: true
    } as any;

    const result = await SpiralStairNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
