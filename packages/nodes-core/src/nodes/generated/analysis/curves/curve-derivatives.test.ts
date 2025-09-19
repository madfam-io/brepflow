
import { describe, it, expect } from 'vitest';
import { CurveDerivativesNode } from './curvederivatives.node';
import { createTestContext } from './../../test-utils';

describe('CurveDerivativesNode', () => {
  it('should create CurveDerivatives', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      parameter: 0.5,
      order: 2,
      vectorScale: 1
    };

    const result = await CurveDerivativesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.point).toBeDefined();
    expect(result.firstDerivative).toBeDefined();
    expect(result.secondDerivative).toBeDefined();
    expect(result.thirdDerivative).toBeDefined();
  });

  
});