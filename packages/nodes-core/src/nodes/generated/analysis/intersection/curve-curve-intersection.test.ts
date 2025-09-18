
import { describe, it, expect } from 'vitest';
import { CurveCurveIntersectionNode } from './curvecurveintersection-node';
import { createTestContext } from '../test-utils';

describe('CurveCurveIntersectionNode', () => {
  it('should create CurveCurveIntersection', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: /* test value */,
      curve2: /* test value */
    };
    const params = {
      tolerance: 0.01,
      extendCurves: false
    };

    const result = await CurveCurveIntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.intersectionPoints).toBeDefined();
    expect(result.parameters1).toBeDefined();
    expect(result.parameters2).toBeDefined();
  });

  
});