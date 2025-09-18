
import { describe, it, expect } from 'vitest';
import { ListFindNode } from './listfind-node';
import { createTestContext } from '../test-utils';

describe('ListFindNode', () => {
  it('should create ListFind', async () => {
    const context = createTestContext();
    const inputs = {
      list: /* test value */,
      pattern: /* test value */
    };
    const params = {
      
    };

    const result = await ListFindNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.items).toBeDefined();
    expect(result.indices).toBeDefined();
  });

  
});