
import { describe, it, expect } from 'vitest';
import { FieldDisplaceNode } from './fielddisplace-node';
import { createTestContext } from '../test-utils';

describe('FieldDisplaceNode', () => {
  it('should create FieldDisplace', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null,
      field: null
    };
    const params = {
      strength: 10
    };

    const result = await FieldDisplaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.displaced).toBeDefined();
  });

  
});