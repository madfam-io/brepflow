
import { describe, it, expect } from 'vitest';
import { UShaped StairNode } from './ushaped stair-node';
import { createTestContext } from '../test-utils';

describe('UShaped StairNode', () => {
  it('should create UShaped Stair', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null
    };
    const params = {
      totalRise: 3000,
      clearance: 100
    };

    const result = await UShaped StairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.staircase).toBeDefined();
  });

  
});