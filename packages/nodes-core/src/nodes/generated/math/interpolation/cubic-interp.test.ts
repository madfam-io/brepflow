
import { describe, it, expect } from 'vitest';
import { CubicInterpNode } from './cubicinterp-node';
import { createTestContext } from '../test-utils';

describe('CubicInterpNode', () => {
  it('should create CubicInterp', async () => {
    const context = createTestContext();
    const inputs = {
      v0: /* test value */,
      v1: /* test value */,
      v2: /* test value */,
      v3: /* test value */,
      t: /* test value */
    };
    const params = {
      
    };

    const result = await CubicInterpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});