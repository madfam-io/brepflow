
import { describe, it, expect } from 'vitest';
import { CurveEndpointsNode } from './curveendpoints.node';
import { createTestContext } from './../../test-utils';

describe('CurveEndpointsNode', () => {
  it('should create CurveEndpoints', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      tangentLength: 10,
      showTangents: true
    };

    const result = await CurveEndpointsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.startPoint).toBeDefined();
    expect(result.endPoint).toBeDefined();
    expect(result.startTangent).toBeDefined();
    expect(result.endTangent).toBeDefined();
  });

  
});