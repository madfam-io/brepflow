
import { describe, it, expect } from 'vitest';
import { FieldAddNode } from './fieldadd-node';
import { createTestContext } from '../test-utils';

describe('FieldAddNode', () => {
  it('should create FieldAdd', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: null,
      fieldB: null
    };
    const params = {
      
    };

    const result = await FieldAddNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});