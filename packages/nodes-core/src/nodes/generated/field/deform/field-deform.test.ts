
import { describe, it, expect } from 'vitest';
import { FieldDeformNode } from './fielddeform-node';
import { createTestContext } from '../test-utils';

describe('FieldDeformNode', () => {
  it('should create FieldDeform', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: /* test value */,
      field: /* test value */
    };
    const params = {
      strength: 10
    };

    const result = await FieldDeformNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.deformed).toBeDefined();
  });

  
});