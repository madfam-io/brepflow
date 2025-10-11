
import { describe, it, expect } from 'vitest';
import { BezierCurveNode } from './bezier-curve.node';
import { createTestContext } from '../test-utils';

describe('BezierCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: undefined
    } as any;
    const params = {

    } as any;

    const result = await BezierCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
