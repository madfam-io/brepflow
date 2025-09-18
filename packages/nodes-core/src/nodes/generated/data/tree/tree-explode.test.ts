
import { describe, it, expect } from 'vitest';
import { TreeExplodeNode } from './treeexplode-node';
import { createTestContext } from '../test-utils';

describe('TreeExplodeNode', () => {
  it('should create TreeExplode', async () => {
    const context = createTestContext();
    const inputs = {
      tree: null
    };
    const params = {
      
    };

    const result = await TreeExplodeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.branches).toBeDefined();
  });

  
});