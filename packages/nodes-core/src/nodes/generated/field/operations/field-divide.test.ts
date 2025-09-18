
import { describe, it, expect } from 'vitest';
import { FieldDivideNode } from './fielddivide-node';
import { createTestContext } from '../test-utils';

describe('FieldDivideNode', () => {
  it('should create FieldDivide', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: null,
      fieldB: null
    };
    const params = {
      epsilon: 0.001
    };

    const result = await FieldDivideNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});