
import { describe, it, expect } from 'vitest';
import { MatrixTransposeNode } from './matrix-transpose.node';
import { createTestContext } from '../test-utils';

describe('MatrixTransposeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      matrix: undefined
    } as any;
    const params = {

    } as any;

    const result = await MatrixTransposeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
