
import { describe, it, expect } from 'vitest';
import { SlabOnGradeNode } from './slab-on-grade.node';
import { createTestContext } from '../test-utils';

describe('SlabOnGradeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      thickness: 150,
      vaporBarrier: true,
      insulation: true
    } as any;

    const result = await SlabOnGradeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
