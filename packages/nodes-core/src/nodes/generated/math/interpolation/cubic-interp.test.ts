
import { describe, it, expect } from 'vitest';
import { CubicInterpNode } from './cubicinterp.node';
import { createTestContext } from './../../test-utils';

describe('CubicInterpNode', () => {
  it('should create CubicInterp', async () => {
    const context = createTestContext();
    const inputs = {
      v0: null,
      v1: null,
      v2: null,
      v3: null,
      t: null
    };
    const params = {
      
    };

    const result = await CubicInterpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});