
import { describe, it, expect } from 'vitest';
import { VoronoiSkeletonNode } from './voronoi-skeleton.node';
import { createTestContext } from '../test-utils';

describe('VoronoiSkeletonNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      pruning: 0.1
    } as any;

    const result = await VoronoiSkeletonNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
