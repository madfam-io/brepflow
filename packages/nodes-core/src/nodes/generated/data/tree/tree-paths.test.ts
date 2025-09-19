
import { describe, it, expect } from 'vitest';
import { TreePathsNode } from './treepaths.node';
import { createTestContext } from './../../test-utils';

describe('TreePathsNode', () => {
  it('should create TreePaths', async () => {
    const context = createTestContext();
    const inputs = {
      tree: null
    };
    const params = {
      
    };

    const result = await TreePathsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.paths).toBeDefined();
  });

  
});