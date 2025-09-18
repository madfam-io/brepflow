
import { describe, it, expect } from 'vitest';
import { HermiteInterpNode } from './hermiteinterp-node';
import { createTestContext } from '../test-utils';

describe('HermiteInterpNode', () => {
  it('should create HermiteInterp', async () => {
    const context = createTestContext();
    const inputs = {
      p0: /* test value */,
      p1: /* test value */,
      m0: /* test value */,
      m1: /* test value */,
      t: /* test value */
    };
    const params = {
      
    };

    const result = await HermiteInterpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});