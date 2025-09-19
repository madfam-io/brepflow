
import { describe, it, expect } from 'vitest';
import { CurveSpiralNode } from './curvespiral.node';
import { createTestContext } from './../../test-utils';

describe('CurveSpiralNode', () => {
  it('should create CurveSpiral', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      tolerance: 0.01,
      showCenter: true
    };

    const result = await CurveSpiralNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isSpiral).toBeDefined();
    expect(result.center).toBeDefined();
    expect(result.pitch).toBeDefined();
    expect(result.turns).toBeDefined();
  });

  
});