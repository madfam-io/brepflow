
import { describe, it, expect } from 'vitest';
import { SurfaceParametrizationNode } from './surfaceparametrization.node';
import { createTestContext } from './../../test-utils';

describe('SurfaceParametrizationNode', () => {
  it('should create SurfaceParametrization', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      showGrid: true,
      gridDensity: 20
    };

    const result = await SurfaceParametrizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.uRange).toBeDefined();
    expect(result.vRange).toBeDefined();
    expect(result.parameterGrid).toBeDefined();
  });

  
});