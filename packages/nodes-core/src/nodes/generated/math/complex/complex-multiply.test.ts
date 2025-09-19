
import { describe, it, expect } from 'vitest';
import { ComplexMultiplyNode } from './complexmultiply.node';
import { createTestContext } from './../../test-utils';

describe('ComplexMultiplyNode', () => {
  it('should create ComplexMultiply', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null
    };
    const params = {
      
    };

    const result = await ComplexMultiplyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});