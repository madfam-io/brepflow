
import { describe, it, expect } from 'vitest';
import { FieldSmoothNode } from './fieldsmooth.node';
import { createTestContext } from './../../test-utils';

describe('FieldSmoothNode', () => {
  it('should create FieldSmooth', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      iterations: 3,
      factor: 0.5
    };

    const result = await FieldSmoothNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.smoothed).toBeDefined();
  });

  
});