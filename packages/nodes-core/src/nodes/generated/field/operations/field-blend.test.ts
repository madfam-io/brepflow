
import { describe, it, expect } from 'vitest';
import { FieldBlendNode } from './field-blend.node';
import { createTestContext } from '../test-utils';

describe('FieldBlendNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: undefined,
      fieldB: undefined,
      factor: undefined
    } as any;
    const params = {
      mode: "linear"
    } as any;

    const result = await FieldBlendNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
