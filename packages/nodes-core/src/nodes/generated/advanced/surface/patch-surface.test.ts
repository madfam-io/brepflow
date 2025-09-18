
import { describe, it, expect } from 'vitest';
import { PatchSurfaceNode } from './patchsurface-node';
import { createTestContext } from '../test-utils';

describe('PatchSurfaceNode', () => {
  it('should create PatchSurface', async () => {
    const context = createTestContext();
    const inputs = {
      boundaryEdges: /* test value */
    };
    const params = {
      continuity: "G1",
      constraintType: "tangent"
    };

    const result = await PatchSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.patch).toBeDefined();
  });

  
});