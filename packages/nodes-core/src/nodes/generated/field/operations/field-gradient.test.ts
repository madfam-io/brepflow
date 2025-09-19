
import { describe, it, expect } from 'vitest';
import { FieldGradientNode } from './fieldgradient.node';
import { createTestContext } from './../../test-utils';

describe('FieldGradientNode', () => {
  it('should create FieldGradient', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      
    };

    const result = await FieldGradientNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gradient).toBeDefined();
  });

  
});