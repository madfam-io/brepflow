
import { describe, it, expect } from 'vitest';
import { BinaryTreeNode } from './binarytree-node';
import { createTestContext } from '../test-utils';

describe('BinaryTreeNode', () => {
  it('should create BinaryTree', async () => {
    const context = createTestContext();
    const inputs = {
      root: null
    };
    const params = {
      depth: 5,
      branchAngle: 30,
      lengthRatio: 0.7
    };

    const result = await BinaryTreeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tree).toBeDefined();
  });

  
});