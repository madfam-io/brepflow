
import { describe, it, expect } from 'vitest';
import { TreeBranchNode } from './treebranch-node';
import { createTestContext } from '../test-utils';

describe('TreeBranchNode', () => {
  it('should create TreeBranch', async () => {
    const context = createTestContext();
    const inputs = {
      tree: null,
      path: null
    };
    const params = {
      
    };

    const result = await TreeBranchNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.branch).toBeDefined();
  });

  
});