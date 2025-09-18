
import { describe, it, expect } from 'vitest';
import { BSplineCurveNode } from './bsplinecurve-node';
import { createTestContext } from '../test-utils';

describe('BSplineCurveNode', () => {
  it('should create BSplineCurve', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: null
    };
    const params = {
      degree: 3,
      periodic: false
    };

    const result = await BSplineCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});