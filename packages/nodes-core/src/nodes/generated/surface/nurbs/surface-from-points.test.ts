
import { describe, it, expect } from 'vitest';
import { SurfaceFromPointsNode } from './surfacefrompoints-node';
import { createTestContext } from '../test-utils';

describe('SurfaceFromPointsNode', () => {
  it('should create SurfaceFromPoints', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */,
      uCount: /* test value */,
      vCount: /* test value */
    };
    const params = {
      degreeU: 3,
      degreeV: 3,
      smoothness: 0.5
    };

    const result = await SurfaceFromPointsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});