
import { describe, it, expect } from 'vitest';
import { TreeGraftNode } from './tree-graft.node';
import { createTestContext } from '../test-utils';

describe('TreeGraftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreeGraftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
