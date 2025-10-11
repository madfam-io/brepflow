
import { describe, it, expect } from 'vitest';
import { AdaptiveTessellationNode } from './adaptive-tessellation.node';
import { createTestContext } from '../test-utils';

describe('AdaptiveTessellationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      minEdgeLength: 0.1,
      maxEdgeLength: 10,
      curvatureFactor: 1
    } as any;

    const result = await AdaptiveTessellationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
