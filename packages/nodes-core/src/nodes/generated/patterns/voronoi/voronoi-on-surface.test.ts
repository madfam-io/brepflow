
import { describe, it, expect } from 'vitest';
import { VoronoiOnSurfaceNode } from './voronoionsurface-node';
import { createTestContext } from '../test-utils';

describe('VoronoiOnSurfaceNode', () => {
  it('should create VoronoiOnSurface', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */,
      points: /* test value */
    };
    const params = {
      geodesic: true
    };

    const result = await VoronoiOnSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cells).toBeDefined();
  });

  
});