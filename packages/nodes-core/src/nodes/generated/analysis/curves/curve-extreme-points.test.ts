
import { describe, it, expect } from 'vitest';
import { CurveExtremePointsNode } from './curve-extreme-points.node';
import { createTestContext } from './../../test-utils';

describe('CurveExtremePointsNode', () => {
  it('should create CurveExtremePoints', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      axis: "all",
      markPoints: true
    };

    const result = await CurveExtremePointsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.minPoints).toBeDefined();
    expect(result.maxPoints).toBeDefined();
    expect(result.extremeValues).toBeDefined();
  });

  
});