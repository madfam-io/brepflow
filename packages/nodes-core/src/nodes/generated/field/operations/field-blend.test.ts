
import { describe, it, expect } from 'vitest';
import { FieldBlendNode } from './fieldblend.node';
import { createTestContext } from './../../test-utils';

describe('FieldBlendNode', () => {
  it('should create FieldBlend', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: null,
      fieldB: null,
      factor: null
    };
    const params = {
      mode: "linear"
    };

    const result = await FieldBlendNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});