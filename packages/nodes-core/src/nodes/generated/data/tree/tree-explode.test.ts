
import { describe, it, expect } from 'vitest';
import { TreeExplodeNode } from './tree-explode.node';
import { createTestContext } from '../test-utils';

describe('TreeExplodeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreeExplodeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
