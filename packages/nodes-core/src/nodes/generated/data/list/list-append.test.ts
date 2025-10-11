
import { describe, it, expect } from 'vitest';
import { ListAppendNode } from './list-append.node';
import { createTestContext } from '../test-utils';

describe('ListAppendNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      item: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListAppendNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
