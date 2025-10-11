
import { describe, it, expect } from 'vitest';
import { SurfaceReconstructionNode } from './surface-reconstruction.node';
import { createTestContext } from '../test-utils';

describe('SurfaceReconstructionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      algorithm: "poisson",
      depth: 8,
      samples: 1
    } as any;

    const result = await SurfaceReconstructionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
