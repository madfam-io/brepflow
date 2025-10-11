
import { describe, it, expect } from 'vitest';
import { ListJoinNode } from './list-join.node';
import { createTestContext } from '../test-utils';

describe('ListJoinNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      lists: undefined
    } as any;
    const params = {

    } as any;

    const result = await ListJoinNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
