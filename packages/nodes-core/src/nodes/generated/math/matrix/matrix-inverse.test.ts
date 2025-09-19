
import { describe, it, expect } from 'vitest';
import { MatrixInverseNode } from './matrixinverse.node';
import { createTestContext } from './../../test-utils';

describe('MatrixInverseNode', () => {
  it('should create MatrixInverse', async () => {
    const context = createTestContext();
    const inputs = {
      matrix: null
    };
    const params = {
      
    };

    const result = await MatrixInverseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.inverse).toBeDefined();
  });

  
});