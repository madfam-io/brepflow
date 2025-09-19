
import { describe, it, expect } from 'vitest';
import { FieldColorNode } from './fieldcolor.node';
import { createTestContext } from './../../test-utils';

describe('FieldColorNode', () => {
  it('should create FieldColor', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null,
      field: null
    };
    const params = {
      gradient: "rainbow"
    };

    const result = await FieldColorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coloredMesh).toBeDefined();
  });

  
});