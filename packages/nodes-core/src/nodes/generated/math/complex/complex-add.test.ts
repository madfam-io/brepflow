
import { describe, it, expect } from 'vitest';
import { ComplexAddNode } from './complex-add.node';
import { createTestContext } from '../test-utils';

describe('ComplexAddNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await ComplexAddNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
