
import { describe, it, expect } from 'vitest';
import { SmoothStepNode } from './smoothstep-node';
import { createTestContext } from '../test-utils';

describe('SmoothStepNode', () => {
  it('should create SmoothStep', async () => {
    const context = createTestContext();
    const inputs = {
      edge0: /* test value */,
      edge1: /* test value */,
      x: /* test value */
    };
    const params = {
      
    };

    const result = await SmoothStepNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});