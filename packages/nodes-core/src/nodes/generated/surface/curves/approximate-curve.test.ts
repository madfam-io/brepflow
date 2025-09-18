
import { describe, it, expect } from 'vitest';
import { ApproximateCurveNode } from './approximatecurve-node';
import { createTestContext } from '../test-utils';

describe('ApproximateCurveNode', () => {
  it('should create ApproximateCurve', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      degree: 3,
      tolerance: 0.01,
      smoothness: 0.5
    };

    const result = await ApproximateCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});