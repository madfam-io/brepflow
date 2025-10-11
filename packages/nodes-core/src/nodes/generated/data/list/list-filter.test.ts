
import { describe, it, expect } from 'vitest';
import { ListFilterNode } from './list-filter.node';
import { createTestContext } from '../test-utils';

describe('ListFilterNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      mask: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListFilterNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
