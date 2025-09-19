
import { describe, it, expect } from 'vitest';
import { ConvexHull3DNode } from './convexhull3d-node';
import { createTestContext } from './../../test-utils';

describe('ConvexHull3DNode', () => {
  it('should create ConvexHull3D', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      tolerance: 0.01,
      includeInterior: false
    };

    const result = await ConvexHull3DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hull).toBeDefined();
    expect(result.vertices).toBeDefined();
    expect(result.faces).toBeDefined();
    expect(result.volume).toBeDefined();
  });

  
});