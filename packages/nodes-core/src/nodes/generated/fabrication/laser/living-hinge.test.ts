
import { describe, it, expect } from 'vitest';
import { LivingHingeNode } from './livinghinge.node';
import { createTestContext } from './../../test-utils';

describe('LivingHingeNode', () => {
  it('should create LivingHinge', async () => {
    const context = createTestContext();
    const inputs = {
      hingeArea: null
    };
    const params = {
      pattern: "straight",
      spacing: 2,
      cutLength: 10
    };

    const result = await LivingHingeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hingePattern).toBeDefined();
  });

  
});