
import { describe, it, expect } from 'vitest';
import { ConvexHull3DNode } from './convex-hull3-d.node';
import { createTestContext } from '../test-utils';

describe('ConvexHull3DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      includeInterior: false
    } as any;

    const result = await ConvexHull3DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
