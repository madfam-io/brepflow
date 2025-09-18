
import { describe, it, expect } from 'vitest';
import { CommonEdgesNode } from './commonedges-node';
import { createTestContext } from '../test-utils';

describe('CommonEdgesNode', () => {
  it('should create CommonEdges', async () => {
    const context = createTestContext();
    const inputs = {
      shape1: /* test value */,
      shape2: /* test value */
    };
    const params = {
      
    };

    const result = await CommonEdgesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.edges).toBeDefined();
  });

  
});