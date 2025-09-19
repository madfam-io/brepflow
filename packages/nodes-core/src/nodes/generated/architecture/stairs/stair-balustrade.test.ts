
import { describe, it, expect } from 'vitest';
import { StairBalustradeNode } from './stairbalustrade.node';
import { createTestContext } from './../../test-utils';

describe('StairBalustradeNode', () => {
  it('should create StairBalustrade', async () => {
    const context = createTestContext();
    const inputs = {
      stairSide: null
    };
    const params = {
      style: "vertical",
      spacing: 100
    };

    const result = await StairBalustradeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.balustrade).toBeDefined();
  });

  
});