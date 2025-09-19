
import { describe, it, expect } from 'vitest';
import { SierpinskiTriangleNode } from './sierpinskitriangle.node';
import { createTestContext } from './../../test-utils';

describe('SierpinskiTriangleNode', () => {
  it('should create SierpinskiTriangle', async () => {
    const context = createTestContext();
    const inputs = {
      triangle: null
    };
    const params = {
      iterations: 5,
      filled: true
    };

    const result = await SierpinskiTriangleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fractal).toBeDefined();
  });

  
});