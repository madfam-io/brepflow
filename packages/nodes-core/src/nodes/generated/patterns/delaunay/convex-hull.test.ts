
import { describe, it, expect } from 'vitest';
import { ConvexHullNode } from './convexhull.node';
import { createTestContext } from './../../test-utils';

describe('ConvexHullNode', () => {
  it('should create ConvexHull', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      
    };

    const result = await ConvexHullNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hull).toBeDefined();
    expect(result.vertices).toBeDefined();
  });

  
});