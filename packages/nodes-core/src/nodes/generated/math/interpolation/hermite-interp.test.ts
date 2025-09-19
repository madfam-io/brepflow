
import { describe, it, expect } from 'vitest';
import { HermiteInterpNode } from './hermiteinterp.node';
import { createTestContext } from './../../test-utils';

describe('HermiteInterpNode', () => {
  it('should create HermiteInterp', async () => {
    const context = createTestContext();
    const inputs = {
      p0: null,
      p1: null,
      m0: null,
      m1: null,
      t: null
    };
    const params = {
      
    };

    const result = await HermiteInterpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});