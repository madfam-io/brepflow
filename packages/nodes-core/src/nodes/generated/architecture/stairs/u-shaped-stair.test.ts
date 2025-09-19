
import { describe, it, expect } from 'vitest';
import { UShapedStairNode } from './ushapedstair.node';
import { createTestContext } from './../../test-utils';

describe('UShapedStairNode', () => {
  it('should create UShapedStair', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null
    };
    const params = {
      totalRise: 3000,
      clearance: 100
    };

    const result = await UShapedStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.staircase).toBeDefined();
  });

  
});