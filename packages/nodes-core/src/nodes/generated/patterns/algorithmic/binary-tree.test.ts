
import { describe, it, expect } from 'vitest';
import { BinaryTreeNode } from './binary-tree.node';
import { createTestContext } from '../test-utils';

describe('BinaryTreeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      root: undefined
    } as any;
    const params = {
      depth: 5,
      branchAngle: 30,
      lengthRatio: 0.7
    } as any;

    const result = await BinaryTreeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
