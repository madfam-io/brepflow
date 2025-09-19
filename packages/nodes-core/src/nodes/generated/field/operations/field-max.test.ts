
import { describe, it, expect } from 'vitest';
import { FieldMaxNode } from './fieldmax.node';
import { createTestContext } from './../../test-utils';

describe('FieldMaxNode', () => {
  it('should create FieldMax', async () => {
    const context = createTestContext();
    const inputs = {
      fields: null
    };
    const params = {
      
    };

    const result = await FieldMaxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});