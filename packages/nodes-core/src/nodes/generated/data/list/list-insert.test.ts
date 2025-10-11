
import { describe, it, expect } from 'vitest';
import { ListInsertNode } from './list-insert.node';
import { createTestContext } from '../test-utils';

describe('ListInsertNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      item: undefined,
      index: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListInsertNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
