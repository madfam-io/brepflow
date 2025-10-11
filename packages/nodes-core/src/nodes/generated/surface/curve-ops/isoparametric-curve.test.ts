
import { describe, it, expect } from 'vitest';
import { IsoparametricCurveNode } from './isoparametric-curve.node';
import { createTestContext } from '../test-utils';

describe('IsoparametricCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      direction: "U",
      parameter: 0.5
    } as any;

    const result = await IsoparametricCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
