
import { describe, it, expect } from 'vitest';
import { MatrixMultiplyNode } from './matrix-multiply.node';
import { createTestContext } from '../test-utils';

describe('MatrixMultiplyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await MatrixMultiplyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
