
import { describe, it, expect } from 'vitest';
import { KnitSurfacesNode } from './knitsurfaces.node';
import { createTestContext } from './../../test-utils';

describe('KnitSurfacesNode', () => {
  it('should create KnitSurfaces', async () => {
    const context = createTestContext();
    const inputs = {
      surfaces: null
    };
    const params = {
      tolerance: 0.01,
      createSolid: false
    };

    const result = await KnitSurfacesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.knittedShape).toBeDefined();
  });

  
});