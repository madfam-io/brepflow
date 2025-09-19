
import { describe, it, expect } from 'vitest';
import { CurveInflectionPointsNode } from './curveinflectionpoints.node';
import { createTestContext } from './../../test-utils';

describe('CurveInflectionPointsNode', () => {
  it('should create CurveInflectionPoints', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      tolerance: 0.01,
      markPoints: true
    };

    const result = await CurveInflectionPointsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.inflectionPoints).toBeDefined();
    expect(result.parameters).toBeDefined();
    expect(result.markers).toBeDefined();
  });

  
});