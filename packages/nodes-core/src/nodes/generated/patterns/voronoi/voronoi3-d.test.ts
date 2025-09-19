
import { describe, it, expect } from 'vitest';
import { Voronoi3DNode } from './voronoi3d-node';
import { createTestContext } from './../../test-utils';

describe('Voronoi3DNode', () => {
  it('should create Voronoi3D', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      clipToBox: true
    };

    const result = await Voronoi3DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cells).toBeDefined();
    expect(result.faces).toBeDefined();
  });

  
});