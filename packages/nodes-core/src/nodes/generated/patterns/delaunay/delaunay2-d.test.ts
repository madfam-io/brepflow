
import { describe, it, expect } from 'vitest';
import { Delaunay2DNode } from './delaunay2d-node';
import { createTestContext } from './../../test-utils';

describe('Delaunay2DNode', () => {
  it('should create Delaunay2D', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      constrainEdges: false
    };

    const result = await Delaunay2DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.triangles).toBeDefined();
    expect(result.mesh).toBeDefined();
  });

  
});