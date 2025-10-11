
import { describe, it, expect } from 'vitest';
import { HilbertCurveNode } from './hilbert-curve.node';
import { createTestContext } from '../test-utils';

describe('HilbertCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: undefined
    } as any;
    const params = {
      order: 4,
      dimension: "2D"
    } as any;

    const result = await HilbertCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
