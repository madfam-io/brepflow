
import { describe, it, expect } from 'vitest';
import { TreeSimplifyNode } from './tree-simplify.node';
import { createTestContext } from '../test-utils';

describe('TreeSimplifyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreeSimplifyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
