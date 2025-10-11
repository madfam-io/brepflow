
import { describe, it, expect } from 'vitest';
import { Voronoi2DNode } from './voronoi2-d.node';
import { createTestContext } from '../test-utils';

describe('Voronoi2DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      boundary: "box",
      clipToBoundary: true
    } as any;

    const result = await Voronoi2DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
