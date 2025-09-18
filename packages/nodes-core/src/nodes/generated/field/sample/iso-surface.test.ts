
import { describe, it, expect } from 'vitest';
import { IsoSurfaceNode } from './isosurface-node';
import { createTestContext } from '../test-utils';

describe('IsoSurfaceNode', () => {
  it('should create IsoSurface', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      value: 0.5,
      resolution: 50
    };

    const result = await IsoSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});