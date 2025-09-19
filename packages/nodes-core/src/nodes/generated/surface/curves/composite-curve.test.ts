
import { describe, it, expect } from 'vitest';
import { CompositeCurveNode } from './compositecurve.node';
import { createTestContext } from './../../test-utils';

describe('CompositeCurveNode', () => {
  it('should create CompositeCurve', async () => {
    const context = createTestContext();
    const inputs = {
      curves: null
    };
    const params = {
      continuity: "G1",
      mergeTolerance: 0.01
    };

    const result = await CompositeCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.composite).toBeDefined();
  });

  
});