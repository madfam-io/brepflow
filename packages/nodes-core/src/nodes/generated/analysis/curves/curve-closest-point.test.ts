
import { describe, it, expect } from 'vitest';
import { CurveClosestPointNode } from './curveclosestpoint.node';
import { createTestContext } from './../../test-utils';

describe('CurveClosestPointNode', () => {
  it('should create CurveClosestPoint', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null,
      point: null
    };
    const params = {
      tolerance: 0.01,
      showConnection: true
    };

    const result = await CurveClosestPointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.closestPoint).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.parameter).toBeDefined();
    expect(result.connectionLine).toBeDefined();
  });

  
});