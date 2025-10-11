
import { describe, it, expect } from 'vitest';
import { FieldSubtractNode } from './field-subtract.node';
import { createTestContext } from '../test-utils';

describe('FieldSubtractNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: undefined,
      fieldB: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldSubtractNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
