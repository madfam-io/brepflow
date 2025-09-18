
import { describe, it, expect } from 'vitest';
import { BezierCurveNode } from './beziercurve-node';
import { createTestContext } from '../test-utils';

describe('BezierCurveNode', () => {
  it('should create BezierCurve', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: /* test value */
    };
    const params = {
      
    };

    const result = await BezierCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});