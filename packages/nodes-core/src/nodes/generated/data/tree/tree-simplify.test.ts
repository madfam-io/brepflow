
import { describe, it, expect } from 'vitest';
import { TreeSimplifyNode } from './treesimplify.node';
import { createTestContext } from './../../test-utils';

describe('TreeSimplifyNode', () => {
  it('should create TreeSimplify', async () => {
    const context = createTestContext();
    const inputs = {
      tree: null
    };
    const params = {
      
    };

    const result = await TreeSimplifyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.simplified).toBeDefined();
  });

  
});