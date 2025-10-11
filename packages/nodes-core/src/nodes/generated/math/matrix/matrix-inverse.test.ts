
import { describe, it, expect } from 'vitest';
import { MatrixInverseNode } from './matrix-inverse.node';
import { createTestContext } from '../test-utils';

describe('MatrixInverseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      matrix: undefined
    } as any;
    const params = {

    } as any;

    const result = await MatrixInverseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
