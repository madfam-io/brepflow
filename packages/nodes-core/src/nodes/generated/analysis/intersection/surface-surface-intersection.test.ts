
import { describe, it, expect } from 'vitest';
import { SurfaceSurfaceIntersectionNode } from './surface-surface-intersection.node';
import { createTestContext } from '../test-utils';

describe('SurfaceSurfaceIntersectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: undefined,
      surface2: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      approximation: false
    } as any;

    const result = await SurfaceSurfaceIntersectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
