
import { describe, it, expect } from 'vitest';
import { FieldWarpNode } from './fieldwarp-node';
import { createTestContext } from '../test-utils';

describe('FieldWarpNode', () => {
  it('should create FieldWarp', async () => {
    const context = createTestContext();
    const inputs = {
      deformation: /* test value */
    };
    const params = {
      strength: 1
    };

    const result = await FieldWarpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.warpedField).toBeDefined();
  });

  
});