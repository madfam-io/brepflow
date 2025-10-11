
import { describe, it, expect } from 'vitest';
import { CurveExtremePointsNode } from './curve-extreme-points.node';
import { createTestContext } from '../test-utils';

describe('CurveExtremePointsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      axis: "all",
      markPoints: true
    } as any;

    const result = await CurveExtremePointsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
