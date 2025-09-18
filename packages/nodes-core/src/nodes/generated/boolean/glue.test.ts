
import { describe, it, expect } from 'vitest';
import { GlueNode } from './glue-node';
import { createTestContext } from '../test-utils';

describe('GlueNode', () => {
  it('should create Glue', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: /* test value */
    };
    const params = {
      tolerance: 1e-7
    };

    const result = await GlueNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});