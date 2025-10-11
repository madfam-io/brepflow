
import { describe, it, expect } from 'vitest';
import { ListReverseNode } from './list-reverse.node';
import { createTestContext } from '../test-utils';

describe('ListReverseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListReverseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
