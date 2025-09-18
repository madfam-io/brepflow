
import { describe, it, expect } from 'vitest';
import { Delaunay3DNode } from './delaunay3d-node';
import { createTestContext } from '../test-utils';

describe('Delaunay3DNode', () => {
  it('should create Delaunay3D', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      
    };

    const result = await Delaunay3DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tetrahedra).toBeDefined();
    expect(result.mesh).toBeDefined();
  });

  
});