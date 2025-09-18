
import { describe, it, expect } from 'vitest';
import { SlabOnGradeNode } from './slabongrade-node';
import { createTestContext } from '../test-utils';

describe('SlabOnGradeNode', () => {
  it('should create SlabOnGrade', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: /* test value */
    };
    const params = {
      thickness: 150,
      vaporBarrier: true,
      insulation: true
    };

    const result = await SlabOnGradeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.slab).toBeDefined();
  });

  
});