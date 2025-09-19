
import { describe, it, expect } from 'vitest';
import { SampleFieldNode } from './samplefield.node';
import { createTestContext } from './../../test-utils';

describe('SampleFieldNode', () => {
  it('should create SampleField', async () => {
    const context = createTestContext();
    const inputs = {
      field: null,
      points: null
    };
    const params = {
      
    };

    const result = await SampleFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.values).toBeDefined();
  });

  
});