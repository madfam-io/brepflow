
import { describe, it, expect } from 'vitest';
import { CurveAttractorNode } from './curveattractor-node';
import { createTestContext } from '../test-utils';

describe('CurveAttractorNode', () => {
  it('should create CurveAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      curves: /* test value */
    };
    const params = {
      strength: 1,
      radius: 50,
      falloff: "smooth"
    };

    const result = await CurveAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});