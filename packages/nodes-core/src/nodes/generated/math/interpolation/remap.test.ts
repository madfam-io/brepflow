
import { describe, it, expect } from 'vitest';
import { RemapNode } from './remap-node';
import { createTestContext } from '../test-utils';

describe('RemapNode', () => {
  it('should create Remap', async () => {
    const context = createTestContext();
    const inputs = {
      value: null,
      fromMin: null,
      fromMax: null,
      toMin: null,
      toMax: null
    };
    const params = {
      
    };

    const result = await RemapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.remapped).toBeDefined();
  });

  
});