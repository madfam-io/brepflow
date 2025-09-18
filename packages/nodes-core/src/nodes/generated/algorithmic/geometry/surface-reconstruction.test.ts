
import { describe, it, expect } from 'vitest';
import { SurfaceReconstructionNode } from './surfacereconstruction-node';
import { createTestContext } from '../test-utils';

describe('SurfaceReconstructionNode', () => {
  it('should create SurfaceReconstruction', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      algorithm: "poisson",
      depth: 8,
      samples: 1
    };

    const result = await SurfaceReconstructionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.quality).toBeDefined();
  });

  
});