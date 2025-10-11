
import { describe, it, expect } from 'vitest';
import { PolyhedronNode } from './polyhedron.node';
import { createTestContext } from '../test-utils';

describe('PolyhedronNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      type: "octahedron",
      size: 50
    } as any;

    const result = await PolyhedronNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
