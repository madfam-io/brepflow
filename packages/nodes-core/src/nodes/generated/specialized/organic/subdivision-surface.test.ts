
import { describe, it, expect } from 'vitest';
import { SubdivisionSurfaceNode } from './subdivisionsurface.node';
import { createTestContext } from './../../test-utils';

describe('SubdivisionSurfaceNode', () => {
  it('should create SubdivisionSurface', async () => {
    const context = createTestContext();
    const inputs = {
      controlMesh: null
    };
    const params = {
      scheme: "catmull-clark",
      levels: 2
    };

    const result = await SubdivisionSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.subdivided).toBeDefined();
  });

  
});