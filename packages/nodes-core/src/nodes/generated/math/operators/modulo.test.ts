
import { describe, it, expect } from 'vitest';
import { ModuloNode } from './modulo.node';
import { createTestContext } from './../../test-utils';

describe('ModuloNode', () => {
  it('should create Modulo', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null
    };
    const params = {
      
    };

    const result = await ModuloNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});