
import { describe, it, expect } from 'vitest';
import { FieldMinNode } from './fieldmin.node';
import { createTestContext } from './../../test-utils';

describe('FieldMinNode', () => {
  it('should create FieldMin', async () => {
    const context = createTestContext();
    const inputs = {
      fields: null
    };
    const params = {
      
    };

    const result = await FieldMinNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});