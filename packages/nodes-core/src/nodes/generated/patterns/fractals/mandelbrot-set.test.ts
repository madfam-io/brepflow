
import { describe, it, expect } from 'vitest';
import { MandelbrotSetNode } from './mandelbrotset-node';
import { createTestContext } from '../test-utils';

describe('MandelbrotSetNode', () => {
  it('should create MandelbrotSet', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      iterations: 100,
      resolution: 200,
      zoom: 1
    };

    const result = await MandelbrotSetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fractal).toBeDefined();
  });

  
});