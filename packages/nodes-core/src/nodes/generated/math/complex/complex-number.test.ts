
import { describe, it, expect } from 'vitest';
import { ComplexNumberNode } from './complexnumber.node';
import { createTestContext } from './../../test-utils';

describe('ComplexNumberNode', () => {
  it('should create ComplexNumber', async () => {
    const context = createTestContext();
    const inputs = {
      real: null,
      imaginary: null
    };
    const params = {
      
    };

    const result = await ComplexNumberNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.complex).toBeDefined();
  });

  
});