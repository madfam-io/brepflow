
import { describe, it, expect } from 'vitest';
import { SurfaceSurfaceIntersectionNode } from './surfacesurfaceintersection-node';
import { createTestContext } from '../test-utils';

describe('SurfaceSurfaceIntersectionNode', () => {
  it('should create SurfaceSurfaceIntersection', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: /* test value */,
      surface2: /* test value */
    };
    const params = {
      tolerance: 0.01,
      approximation: false
    };

    const result = await SurfaceSurfaceIntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.intersectionCurves).toBeDefined();
    expect(result.intersectionPoints).toBeDefined();
  });

  
});