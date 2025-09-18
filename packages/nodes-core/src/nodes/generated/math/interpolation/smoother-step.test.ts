
import { describe, it, expect } from 'vitest';
import { SmootherStepNode } from './smootherstep-node';
import { createTestContext } from '../test-utils';

describe('SmootherStepNode', () => {
  it('should create SmootherStep', async () => {
    const context = createTestContext();
    const inputs = {
      edge0: /* test value */,
      edge1: /* test value */,
      x: /* test value */
    };
    const params = {
      
    };

    const result = await SmootherStepNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});