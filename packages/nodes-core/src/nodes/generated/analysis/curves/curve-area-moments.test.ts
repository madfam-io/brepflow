
import { describe, it, expect } from 'vitest';
import { CurveAreaMomentsNode } from './curveareamoments.node';
import { createTestContext } from './../../test-utils';

describe('CurveAreaMomentsNode', () => {
  it('should create CurveAreaMoments', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      precision: 0.01,
      showCentroid: true
    };

    const result = await CurveAreaMomentsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.area).toBeDefined();
    expect(result.centroid).toBeDefined();
    expect(result.momentX).toBeDefined();
    expect(result.momentY).toBeDefined();
  });

  
});