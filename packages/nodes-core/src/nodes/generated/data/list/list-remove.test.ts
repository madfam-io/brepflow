
import { describe, it, expect } from 'vitest';
import { ListRemoveNode } from './list-remove.node';
import { createTestContext } from '../test-utils';

describe('ListRemoveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      index: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListRemoveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
