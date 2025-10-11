
import { describe, it, expect } from 'vitest';
import { GeodesicCurveNode } from './geodesic-curve.node';
import { createTestContext } from '../test-utils';

describe('GeodesicCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined,
      startPoint: undefined,
      endPoint: undefined
    } as any;
    const params = {

    } as any;

    const result = await GeodesicCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
