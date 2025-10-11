
import { describe, it, expect } from 'vitest';
import { TreeFlattenNode } from './tree-flatten.node';
import { createTestContext } from '../test-utils';

describe('TreeFlattenNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {
      depth: 1
    } as any;

    const result = await TreeFlattenNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
