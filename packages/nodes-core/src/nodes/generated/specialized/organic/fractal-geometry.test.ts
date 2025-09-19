
import { describe, it, expect } from 'vitest';
import { FractalGeometryNode } from './fractalgeometry.node';
import { createTestContext } from './../../test-utils';

describe('FractalGeometryNode', () => {
  it('should create FractalGeometry', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      type: "koch",
      iterations: 3,
      scale: 100
    };

    const result = await FractalGeometryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fractal).toBeDefined();
  });

  
});