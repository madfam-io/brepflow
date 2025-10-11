
import { describe, it, expect } from 'vitest';
import { ConvexHullNode } from './convex-hull.node';
import { createTestContext } from '../test-utils';

describe('ConvexHullNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {

    } as any;

    const result = await ConvexHullNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
