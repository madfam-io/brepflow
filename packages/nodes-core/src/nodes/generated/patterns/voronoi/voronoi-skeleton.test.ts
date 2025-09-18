
import { describe, it, expect } from 'vitest';
import { VoronoiSkeletonNode } from './voronoiskeleton-node';
import { createTestContext } from '../test-utils';

describe('VoronoiSkeletonNode', () => {
  it('should create VoronoiSkeleton', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      pruning: 0.1
    };

    const result = await VoronoiSkeletonNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.skeleton).toBeDefined();
  });

  
});