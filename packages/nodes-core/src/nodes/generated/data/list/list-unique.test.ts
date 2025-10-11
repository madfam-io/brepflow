
import { describe, it, expect } from 'vitest';
import { ListUniqueNode } from './list-unique.node';
import { createTestContext } from '../test-utils';

describe('ListUniqueNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListUniqueNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
