
import { describe, it, expect } from 'vitest';
import { NurbsCurveNode } from './nurbscurve.node';
import { createTestContext } from './../../test-utils';

describe('NurbsCurveNode', () => {
  it('should create NurbsCurve', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: null
    };
    const params = {
      degree: 3,
      periodic: false
    };

    const result = await NurbsCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});