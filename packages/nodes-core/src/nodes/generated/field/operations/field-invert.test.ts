
import { describe, it, expect } from 'vitest';
import { FieldInvertNode } from './field-invert.node';
import { createTestContext } from '../test-utils';

describe('FieldInvertNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldInvertNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
