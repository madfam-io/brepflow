
import { describe, it, expect } from 'vitest';
import { MatrixTransformNode } from './matrixtransform-node';
import { createTestContext } from '../test-utils';

describe('MatrixTransformNode', () => {
  it('should create MatrixTransform', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */,
      matrix: /* test value */
    };
    const params = {
      
    };

    const result = await MatrixTransformNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.transformed).toBeDefined();
  });

  
});