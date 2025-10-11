
import { describe, it, expect } from 'vitest';
import { VoronoiOffsetNode } from './voronoi-offset.node';
import { createTestContext } from '../test-utils';

describe('VoronoiOffsetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      cells: undefined
    } as any;
    const params = {
      offset: 1,
      roundCorners: false
    } as any;

    const result = await VoronoiOffsetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
