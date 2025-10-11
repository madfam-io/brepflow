
import { describe, it, expect } from 'vitest';
import { PatchSurfaceNode } from './patch-surface.node';
import { createTestContext } from '../test-utils';

describe('PatchSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundaryEdges: undefined
    } as any;
    const params = {
      continuity: "G1",
      constraintType: "tangent"
    } as any;

    const result = await PatchSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
