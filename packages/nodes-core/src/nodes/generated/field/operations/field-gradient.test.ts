
import { describe, it, expect } from 'vitest';
import { FieldGradientNode } from './field-gradient.node';
import { createTestContext } from '../test-utils';

describe('FieldGradientNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldGradientNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
