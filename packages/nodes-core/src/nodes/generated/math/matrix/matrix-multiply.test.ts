
import { describe, it, expect } from 'vitest';
import { MatrixMultiplyNode } from './matrixmultiply.node';
import { createTestContext } from './../../test-utils';

describe('MatrixMultiplyNode', () => {
  it('should create MatrixMultiply', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null
    };
    const params = {
      
    };

    const result = await MatrixMultiplyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});