
import { describe, it, expect } from 'vitest';
import { MatrixTransposeNode } from './matrixtranspose.node';
import { createTestContext } from './../../test-utils';

describe('MatrixTransposeNode', () => {
  it('should create MatrixTranspose', async () => {
    const context = createTestContext();
    const inputs = {
      matrix: null
    };
    const params = {
      
    };

    const result = await MatrixTransposeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.transpose).toBeDefined();
  });

  
});