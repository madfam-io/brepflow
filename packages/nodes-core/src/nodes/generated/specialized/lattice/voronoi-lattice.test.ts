
import { describe, it, expect } from 'vitest';
import { VoronoiLatticeNode } from './voronoilattice.node';
import { createTestContext } from './../../test-utils';

describe('VoronoiLatticeNode', () => {
  it('should create VoronoiLattice', async () => {
    const context = createTestContext();
    const inputs = {
      boundingShape: null
    };
    const params = {
      seedCount: 100,
      strutDiameter: 1,
      randomSeed: 42
    };

    const result = await VoronoiLatticeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.voronoi).toBeDefined();
  });

  
});