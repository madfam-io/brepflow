
import { describe, it, expect } from 'vitest';
import { HilbertCurveNode } from './hilbertcurve.node';
import { createTestContext } from './../../test-utils';

describe('HilbertCurveNode', () => {
  it('should create HilbertCurve', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      order: 4,
      dimension: "2D"
    };

    const result = await HilbertCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});