
import { describe, it, expect } from 'vitest';
import { TreePruneNode } from './tree-prune.node';
import { createTestContext } from '../test-utils';

describe('TreePruneNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreePruneNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
