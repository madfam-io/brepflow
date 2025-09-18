
import { describe, it, expect } from 'vitest';
import { MatrixDeterminantNode } from './matrixdeterminant-node';
import { createTestContext } from '../test-utils';

describe('MatrixDeterminantNode', () => {
  it('should create MatrixDeterminant', async () => {
    const context = createTestContext();
    const inputs = {
      matrix: /* test value */
    };
    const params = {
      
    };

    const result = await MatrixDeterminantNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.determinant).toBeDefined();
  });

  
});