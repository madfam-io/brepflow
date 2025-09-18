
import { describe, it, expect } from 'vitest';
import { CurveSurfaceIntersectionNode } from './curvesurfaceintersection-node';
import { createTestContext } from '../test-utils';

describe('CurveSurfaceIntersectionNode', () => {
  it('should create CurveSurfaceIntersection', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */,
      surface: /* test value */
    };
    const params = {
      tolerance: 0.01,
      extendCurve: false
    };

    const result = await CurveSurfaceIntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.intersectionPoints).toBeDefined();
    expect(result.curveParameters).toBeDefined();
    expect(result.surfaceParameters).toBeDefined();
  });

  
});