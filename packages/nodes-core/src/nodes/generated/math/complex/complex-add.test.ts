
import { describe, it, expect } from 'vitest';
import { ComplexAddNode } from './complexadd.node';
import { createTestContext } from './../../test-utils';

describe('ComplexAddNode', () => {
  it('should create ComplexAdd', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null
    };
    const params = {
      
    };

    const result = await ComplexAddNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});