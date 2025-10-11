
import { describe, it, expect } from 'vitest';
import { ListContainsNode } from './list-contains.node';
import { createTestContext } from '../test-utils';

describe('ListContainsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      item: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListContainsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
