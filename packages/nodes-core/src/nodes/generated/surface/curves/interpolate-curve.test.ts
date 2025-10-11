
import { describe, it, expect } from 'vitest';
import { InterpolateCurveNode } from './interpolate-curve.node';
import { createTestContext } from '../test-utils';

describe('InterpolateCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      degree: 3,
      periodic: false,
      tangentStart: null,
      tangentEnd: null
    } as any;

    const result = await InterpolateCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
