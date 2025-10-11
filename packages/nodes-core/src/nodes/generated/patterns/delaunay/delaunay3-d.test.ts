
import { describe, it, expect } from 'vitest';
import { Delaunay3DNode } from './delaunay3-d.node';
import { createTestContext } from '../test-utils';

describe('Delaunay3DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {

    } as any;

    const result = await Delaunay3DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
