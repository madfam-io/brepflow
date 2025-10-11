
import { describe, it, expect } from 'vitest';
import { SubdivideMeshNode } from './subdivide-mesh.node';
import { createTestContext } from '../test-utils';

describe('SubdivideMeshNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      subdivisionType: "loop",
      levels: 1
    } as any;

    const result = await SubdivideMeshNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
