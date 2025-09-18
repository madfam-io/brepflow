
import { describe, it, expect } from 'vitest';
import { StraightStairNode } from './straightstair-node';
import { createTestContext } from '../test-utils';

describe('StraightStairNode', () => {
  it('should create StraightStair', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: /* test value */
    };
    const params = {
      totalRise: 3000,
      treadDepth: 280,
      riserHeight: 175,
      width: 1200
    };

    const result = await StraightStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.staircase).toBeDefined();
    expect(result.treads).toBeDefined();
    expect(result.risers).toBeDefined();
  });

  
});