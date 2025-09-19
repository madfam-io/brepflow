
import { describe, it, expect } from 'vitest';
import { SurfaceDerivativesNode } from './surfacederivatives.node';
import { createTestContext } from './../../test-utils';

describe('SurfaceDerivativesNode', () => {
  it('should create SurfaceDerivatives', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      u: 0.5,
      v: 0.5,
      order: 2,
      vectorScale: 1
    };

    const result = await SurfaceDerivativesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.point).toBeDefined();
    expect(result.duVector).toBeDefined();
    expect(result.dvVector).toBeDefined();
    expect(result.normal).toBeDefined();
  });

  
});