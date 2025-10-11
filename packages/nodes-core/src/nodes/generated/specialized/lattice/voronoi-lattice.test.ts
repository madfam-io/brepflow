
import { describe, it, expect } from 'vitest';
import { VoronoiLatticeNode } from './voronoi-lattice.node';
import { createTestContext } from '../test-utils';

describe('VoronoiLatticeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundingShape: undefined
    } as any;
    const params = {
      seedCount: 100,
      strutDiameter: 1,
      randomSeed: 42
    } as any;

    const result = await VoronoiLatticeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
