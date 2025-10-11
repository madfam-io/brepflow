
import { describe, it, expect } from 'vitest';
import { BallBearingNode } from './ball-bearing.node';
import { createTestContext } from '../test-utils';

describe('BallBearingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      innerDiameter: 20,
      outerDiameter: 47,
      width: 14,
      ballCount: 8,
      showCage: true
    } as any;

    const result = await BallBearingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
