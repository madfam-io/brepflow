
import { describe, it, expect } from 'vitest';
import { TreeBranchNode } from './tree-branch.node';
import { createTestContext } from '../test-utils';

describe('TreeBranchNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined,
      path: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreeBranchNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
