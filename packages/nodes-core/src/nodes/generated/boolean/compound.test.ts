
import { describe, it, expect } from 'vitest';
import { CompoundNode } from './compound-node';
import { createTestContext } from '../test-utils';

describe('CompoundNode', () => {
  it('should create Compound', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: /* test value */
    };
    const params = {
      
    };

    const result = await CompoundNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.compound).toBeDefined();
  });

  
});