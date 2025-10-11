
import { describe, it, expect } from 'vitest';
import { KnitSurfacesNode } from './knit-surfaces.node';
import { createTestContext } from '../test-utils';

describe('KnitSurfacesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surfaces: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      createSolid: false
    } as any;

    const result = await KnitSurfacesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
