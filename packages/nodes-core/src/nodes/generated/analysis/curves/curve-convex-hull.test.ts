
import { describe, it, expect } from 'vitest';
import { CurveConvexHullNode } from './curveconvexhull.node';
import { createTestContext } from './../../test-utils';

describe('CurveConvexHullNode', () => {
  it('should create CurveConvexHull', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      samples: 100
    };

    const result = await CurveConvexHullNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.convexHull).toBeDefined();
    expect(result.hullPoints).toBeDefined();
  });

  
});