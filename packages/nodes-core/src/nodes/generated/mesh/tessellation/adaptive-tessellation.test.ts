
import { describe, it, expect } from 'vitest';
import { AdaptiveTessellationNode } from './adaptivetessellation-node';
import { createTestContext } from '../test-utils';

describe('AdaptiveTessellationNode', () => {
  it('should create AdaptiveTessellation', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      minEdgeLength: 0.1,
      maxEdgeLength: 10,
      curvatureFactor: 1
    };

    const result = await AdaptiveTessellationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
  });

  
});