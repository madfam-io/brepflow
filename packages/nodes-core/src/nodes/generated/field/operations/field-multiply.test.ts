
import { describe, it, expect } from 'vitest';
import { FieldMultiplyNode } from './field-multiply.node';
import { createTestContext } from '../test-utils';

describe('FieldMultiplyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: undefined,
      fieldB: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldMultiplyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
