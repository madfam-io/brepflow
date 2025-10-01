
import { describe, it, expect } from 'vitest';
import { IsoparametricCurveNode } from './isoparametric-curve.node';
import { createTestContext } from './../../test-utils';

describe('IsoparametricCurveNode', () => {
  it('should create IsoparametricCurve', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      direction: "U",
      parameter: 0.5
    };

    const result = await IsoparametricCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isoCurve).toBeDefined();
  });

  
});
