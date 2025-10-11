
import { describe, it, expect } from 'vitest';
import { Delaunay2DNode } from './delaunay2-d.node';
import { createTestContext } from '../test-utils';

describe('Delaunay2DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      constrainEdges: false
    } as any;

    const result = await Delaunay2DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
