
import { describe, it, expect } from 'vitest';
import { RayIntersectionNode } from './rayintersection-node';
import { createTestContext } from '../test-utils';

describe('RayIntersectionNode', () => {
  it('should create RayIntersection', async () => {
    const context = createTestContext();
    const inputs = {
      rayOrigin: /* test value */,
      rayDirection: /* test value */,
      targets: /* test value */
    };
    const params = {
      tolerance: 0.01,
      maxDistance: 1000
    };

    const result = await RayIntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hitPoints).toBeDefined();
    expect(result.hitDistances).toBeDefined();
    expect(result.hitNormals).toBeDefined();
  });

  
});