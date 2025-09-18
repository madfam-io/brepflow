
import { describe, it, expect } from 'vitest';
import { FixedNode } from './fixed-node';
import { createTestContext } from '../test-utils';

describe('FixedNode', () => {
  it('should create Fixed', async () => {
    const context = createTestContext();
    const inputs = {
      entity: /* test value */
    };
    const params = {
      
    };

    const result = await FixedNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrained).toBeDefined();
    expect(result.constraint).toBeDefined();
  });

  
});