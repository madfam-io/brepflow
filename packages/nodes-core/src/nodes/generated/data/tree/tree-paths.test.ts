
import { describe, it, expect } from 'vitest';
import { TreePathsNode } from './tree-paths.node';
import { createTestContext } from '../test-utils';

describe('TreePathsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreePathsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
