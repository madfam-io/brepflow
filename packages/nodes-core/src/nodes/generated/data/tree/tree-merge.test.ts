
import { describe, it, expect } from 'vitest';
import { TreeMergeNode } from './treemerge.node';
import { createTestContext } from './../../test-utils';

describe('TreeMergeNode', () => {
  it('should create TreeMerge', async () => {
    const context = createTestContext();
    const inputs = {
      treeA: null,
      treeB: null
    };
    const params = {
      
    };

    const result = await TreeMergeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.merged).toBeDefined();
  });

  
});