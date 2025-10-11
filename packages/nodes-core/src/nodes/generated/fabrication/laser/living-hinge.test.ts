
import { describe, it, expect } from 'vitest';
import { LivingHingeNode } from './living-hinge.node';
import { createTestContext } from '../test-utils';

describe('LivingHingeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      hingeArea: undefined
    } as any;
    const params = {
      pattern: "straight",
      spacing: 2,
      cutLength: 10
    } as any;

    const result = await LivingHingeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
