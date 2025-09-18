
import { describe, it, expect } from 'vitest';
import { Voronoi2DNode } from './voronoi2d-node';
import { createTestContext } from '../test-utils';

describe('Voronoi2DNode', () => {
  it('should create Voronoi2D', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */
    };
    const params = {
      boundary: "box",
      clipToBoundary: true
    };

    const result = await Voronoi2DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cells).toBeDefined();
    expect(result.edges).toBeDefined();
  });

  
});