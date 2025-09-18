
import { describe, it, expect } from 'vitest';
import { PolyhedronNode } from './polyhedron-node';
import { createTestContext } from '../test-utils';

describe('PolyhedronNode', () => {
  it('should create Polyhedron', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      type: "octahedron",
      size: 50
    };

    const result = await PolyhedronNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});