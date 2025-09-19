
import { describe, it, expect } from 'vitest';
import { BezierInterpNode } from './bezierinterp.node';
import { createTestContext } from './../../test-utils';

describe('BezierInterpNode', () => {
  it('should create BezierInterp', async () => {
    const context = createTestContext();
    const inputs = {
      points: null,
      t: null
    };
    const params = {
      
    };

    const result = await BezierInterpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});