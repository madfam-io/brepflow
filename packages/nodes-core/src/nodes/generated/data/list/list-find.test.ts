
import { describe, it, expect } from 'vitest';
import { ListFindNode } from './list-find.node';
import { createTestContext } from '../test-utils';

describe('ListFindNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      pattern: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListFindNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
