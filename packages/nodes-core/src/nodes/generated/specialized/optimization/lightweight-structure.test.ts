
import { describe, it, expect } from 'vitest';
import { LightweightStructureNode } from './lightweightstructure-node';
import { createTestContext } from '../test-utils';

describe('LightweightStructureNode', () => {
  it('should create LightweightStructure', async () => {
    const context = createTestContext();
    const inputs = {
      solid: null
    };
    const params = {
      targetWeight: 0.5,
      structureType: "hybrid"
    };

    const result = await LightweightStructureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.lightweighted).toBeDefined();
    expect(result.weightReduction).toBeDefined();
  });

  
});