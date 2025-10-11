
import { describe, it, expect } from 'vitest';
import { MatrixDeterminantNode } from './matrix-determinant.node';
import { createTestContext } from '../test-utils';

describe('MatrixDeterminantNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      matrix: undefined
    } as any;
    const params = {

    } as any;

    const result = await MatrixDeterminantNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
