
import { describe, it, expect } from 'vitest';
import { FieldSubtractNode } from './fieldsubtract-node';
import { createTestContext } from '../test-utils';

describe('FieldSubtractNode', () => {
  it('should create FieldSubtract', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: null,
      fieldB: null
    };
    const params = {
      
    };

    const result = await FieldSubtractNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});