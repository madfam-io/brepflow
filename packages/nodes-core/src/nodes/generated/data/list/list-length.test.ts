
import { describe, it, expect } from 'vitest';
import { ListLengthNode } from './list-length.node';
import { createTestContext } from '../test-utils';

describe('ListLengthNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListLengthNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
