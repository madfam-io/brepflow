
import { describe, it, expect } from 'vitest';
import { FieldMorphingNode } from './fieldmorphing-node';
import { createTestContext } from '../test-utils';

describe('FieldMorphingNode', () => {
  it('should create FieldMorphing', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      factor: 0.5,
      interpolation: "\"linear\""
    };

    const result = await FieldMorphingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.morphedField).toBeDefined();
  });

  
});