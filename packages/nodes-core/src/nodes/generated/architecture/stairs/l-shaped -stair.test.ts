
import { describe, it, expect } from 'vitest';
import { LShaped StairNode } from './lshaped stair-node';
import { createTestContext } from '../test-utils';

describe('LShaped StairNode', () => {
  it('should create LShaped Stair', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null
    };
    const params = {
      totalRise: 3000,
      landingSize: 1200,
      turnDirection: "right"
    };

    const result = await LShaped StairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.staircase).toBeDefined();
    expect(result.landing).toBeDefined();
  });

  
});