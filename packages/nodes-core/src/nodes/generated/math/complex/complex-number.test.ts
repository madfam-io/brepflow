
import { describe, it, expect } from 'vitest';
import { ComplexNumberNode } from './complex-number.node';
import { createTestContext } from '../test-utils';

describe('ComplexNumberNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      real: undefined,
      imaginary: undefined
    } as any;
    const params = {

    } as any;

    const result = await ComplexNumberNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
