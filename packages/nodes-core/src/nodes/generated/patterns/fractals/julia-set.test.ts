
import { describe, it, expect } from 'vitest';
import { JuliaSetNode } from './juliaset-node';
import { createTestContext } from '../test-utils';

describe('JuliaSetNode', () => {
  it('should create JuliaSet', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      cReal: -0.7,
      cImag: 0.27,
      iterations: 100,
      resolution: 100
    };

    const result = await JuliaSetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fractal).toBeDefined();
  });

  
});