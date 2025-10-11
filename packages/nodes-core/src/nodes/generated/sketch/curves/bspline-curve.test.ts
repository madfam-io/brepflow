
import { describe, it, expect } from 'vitest';
import { BSplineCurveNode } from './bspline-curve.node';
import { createTestContext } from '../test-utils';

describe('BSplineCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: undefined
    } as any;
    const params = {
      degree: 3,
      periodic: false
    } as any;

    const result = await BSplineCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
