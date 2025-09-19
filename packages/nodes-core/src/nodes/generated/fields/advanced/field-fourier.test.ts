
import { describe, it, expect } from 'vitest';
import { FieldFourierNode } from './fieldfourier.node';
import { createTestContext } from './../../test-utils';

describe('FieldFourierNode', () => {
  it('should create FieldFourier', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      direction: "\"forward\""
    };

    const result = await FieldFourierNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.transformedField).toBeDefined();
    expect(result.phase).toBeDefined();
    expect(result.magnitude).toBeDefined();
  });

  
});