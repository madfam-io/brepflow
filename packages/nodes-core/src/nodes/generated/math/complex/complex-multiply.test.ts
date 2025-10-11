
import { describe, it, expect } from 'vitest';
import { ComplexMultiplyNode } from './complex-multiply.node';
import { createTestContext } from '../test-utils';

describe('ComplexMultiplyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await ComplexMultiplyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
