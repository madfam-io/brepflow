
import { describe, it, expect } from 'vitest';
import { ListReplaceNode } from './list-replace.node';
import { createTestContext } from '../test-utils';

describe('ListReplaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      item: undefined,
      index: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListReplaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
