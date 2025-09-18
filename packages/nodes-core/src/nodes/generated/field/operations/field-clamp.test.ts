
import { describe, it, expect } from 'vitest';
import { FieldClampNode } from './fieldclamp-node';
import { createTestContext } from '../test-utils';

describe('FieldClampNode', () => {
  it('should create FieldClamp', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      min: 0,
      max: 1
    };

    const result = await FieldClampNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.clamped).toBeDefined();
  });

  
});