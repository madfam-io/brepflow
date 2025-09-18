
import { describe, it, expect } from 'vitest';
import { ListItemNode } from './listitem-node';
import { createTestContext } from '../test-utils';

describe('ListItemNode', () => {
  it('should create ListItem', async () => {
    const context = createTestContext();
    const inputs = {
      list: /* test value */,
      index: /* test value */
    };
    const params = {
      wrap: false
    };

    const result = await ListItemNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.item).toBeDefined();
  });

  
});