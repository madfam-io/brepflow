
import { describe, it, expect } from 'vitest';
import { SurfaceFromPointsNode } from './surface-from-points.node';
import { createTestContext } from '../test-utils';

describe('SurfaceFromPointsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined,
      uCount: undefined,
      vCount: undefined
    } as any;
    const params = {
      degreeU: 3,
      degreeV: 3,
      smoothness: 0.5
    } as any;

    const result = await SurfaceFromPointsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
