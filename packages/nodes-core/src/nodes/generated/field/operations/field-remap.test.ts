
import { describe, it, expect } from 'vitest';
import { FieldRemapNode } from './fieldremap.node';
import { createTestContext } from './../../test-utils';

describe('FieldRemapNode', () => {
  it('should create FieldRemap', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      fromMin: 0,
      fromMax: 1,
      toMin: 0,
      toMax: 100
    };

    const result = await FieldRemapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.remapped).toBeDefined();
  });

  
});