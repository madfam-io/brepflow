
import { describe, it, expect } from 'vitest';
import { MinimumSpanningTreeNode } from './minimum-spanning-tree.node';
import { createTestContext } from '../test-utils';

describe('MinimumSpanningTreeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {

    } as any;

    const result = await MinimumSpanningTreeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
