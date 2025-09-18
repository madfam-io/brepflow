
import { describe, it, expect } from 'vitest';
import { FieldMultiplyNode } from './fieldmultiply-node';
import { createTestContext } from '../test-utils';

describe('FieldMultiplyNode', () => {
  it('should create FieldMultiply', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: null,
      fieldB: null
    };
    const params = {
      
    };

    const result = await FieldMultiplyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});