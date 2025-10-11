
import { describe, it, expect } from 'vitest';
import { RayIntersectionNode } from './ray-intersection.node';
import { createTestContext } from '../test-utils';

describe('RayIntersectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      rayOrigin: undefined,
      rayDirection: undefined,
      targets: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      maxDistance: 1000
    } as any;

    const result = await RayIntersectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
