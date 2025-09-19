
import { describe, it, expect } from 'vitest';
import { FieldPotentialNode } from './fieldpotential.node';
import { createTestContext } from './../../test-utils';

describe('FieldPotentialNode', () => {
  it('should create FieldPotential', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      referencePoint: "[0, 0, 0]"
    };

    const result = await FieldPotentialNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.potentialField).toBeDefined();
    expect(result.isConservative).toBeDefined();
  });

  
});