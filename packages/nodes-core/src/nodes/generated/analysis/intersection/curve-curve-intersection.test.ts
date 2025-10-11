
import { describe, it, expect } from 'vitest';
import { CurveCurveIntersectionNode } from './curve-curve-intersection.node';
import { createTestContext } from '../test-utils';

describe('CurveCurveIntersectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: undefined,
      curve2: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      extendCurves: false
    } as any;

    const result = await CurveCurveIntersectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
