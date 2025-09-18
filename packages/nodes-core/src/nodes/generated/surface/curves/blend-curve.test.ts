
import { describe, it, expect } from 'vitest';
import { BlendCurveNode } from './blendcurve-node';
import { createTestContext } from '../test-utils';

describe('BlendCurveNode', () => {
  it('should create BlendCurve', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: null,
      curve2: null
    };
    const params = {
      continuityStart: "G1",
      continuityEnd: "G1",
      bulge: 1
    };

    const result = await BlendCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.blendCurve).toBeDefined();
  });

  
});