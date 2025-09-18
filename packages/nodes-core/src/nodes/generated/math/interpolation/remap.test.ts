
import { describe, it, expect } from 'vitest';
import { RemapNode } from './remap-node';
import { createTestContext } from '../test-utils';

describe('RemapNode', () => {
  it('should create Remap', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */,
      fromMin: /* test value */,
      fromMax: /* test value */,
      toMin: /* test value */,
      toMax: /* test value */
    };
    const params = {
      
    };

    const result = await RemapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.remapped).toBeDefined();
  });

  
});