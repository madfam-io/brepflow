
import { describe, it, expect } from 'vitest';
import { ListSliceNode } from './list-slice.node';
import { createTestContext } from '../test-utils';

describe('ListSliceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      start: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListSliceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
