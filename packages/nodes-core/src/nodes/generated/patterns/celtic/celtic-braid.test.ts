
import { describe, it, expect } from 'vitest';
import { CelticBraidNode } from './celticbraid-node';
import { createTestContext } from '../test-utils';

describe('CelticBraidNode', () => {
  it('should create CelticBraid', async () => {
    const context = createTestContext();
    const inputs = {
      centerline: null
    };
    const params = {
      strands: 3,
      crossings: 5
    };

    const result = await CelticBraidNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.braid).toBeDefined();
  });

  
});