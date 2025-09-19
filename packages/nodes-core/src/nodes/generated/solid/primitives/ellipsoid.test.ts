
import { describe, it, expect } from 'vitest';
import { EllipsoidNode } from './ellipsoid.node';
import { createTestContext } from './../../test-utils';

describe('EllipsoidNode', () => {
  it('should create Ellipsoid', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      radiusX: 50,
      radiusY: 40,
      radiusZ: 30,
      centerX: 0,
      centerY: 0,
      centerZ: 0
    };

    const result = await EllipsoidNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});