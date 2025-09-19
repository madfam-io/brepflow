
import { describe, it, expect } from 'vitest';
import { FieldInvertNode } from './fieldinvert.node';
import { createTestContext } from './../../test-utils';

describe('FieldInvertNode', () => {
  it('should create FieldInvert', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      
    };

    const result = await FieldInvertNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.inverted).toBeDefined();
  });

  
});