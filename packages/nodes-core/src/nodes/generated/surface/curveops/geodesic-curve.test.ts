
import { describe, it, expect } from 'vitest';
import { GeodesicCurveNode } from './geodesiccurve-node';
import { createTestContext } from '../test-utils';

describe('GeodesicCurveNode', () => {
  it('should create GeodesicCurve', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */,
      startPoint: /* test value */,
      endPoint: /* test value */
    };
    const params = {
      
    };

    const result = await GeodesicCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.geodesic).toBeDefined();
  });

  
});