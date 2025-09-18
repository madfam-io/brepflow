
import { describe, it, expect } from 'vitest';
import { ListJoinNode } from './listjoin-node';
import { createTestContext } from '../test-utils';

describe('ListJoinNode', () => {
  it('should create ListJoin', async () => {
    const context = createTestContext();
    const inputs = {
      lists: null
    };
    const params = {
      
    };

    const result = await ListJoinNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joined).toBeDefined();
  });

  
});