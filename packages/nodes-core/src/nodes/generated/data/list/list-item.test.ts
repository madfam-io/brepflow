
import { describe, it, expect } from 'vitest';
import { ListItemNode } from './list-item.node';
import { createTestContext } from '../test-utils';

describe('ListItemNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      index: undefined
    } as any;
    const params = {
      wrap: false
    } as any;

    const result = await ListItemNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
