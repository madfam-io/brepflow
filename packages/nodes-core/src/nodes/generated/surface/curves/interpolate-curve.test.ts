
import { describe, it, expect } from 'vitest';
import { InterpolateCurveNode } from './interpolatecurve-node';
import { createTestContext } from '../test-utils';

describe('InterpolateCurveNode', () => {
  it('should create InterpolateCurve', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      degree: 3,
      periodic: false,
      tangentStart: null,
      tangentEnd: null
    };

    const result = await InterpolateCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});