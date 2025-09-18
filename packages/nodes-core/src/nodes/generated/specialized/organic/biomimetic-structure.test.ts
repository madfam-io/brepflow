
import { describe, it, expect } from 'vitest';
import { BiomimeticStructureNode } from './biomimeticstructure-node';
import { createTestContext } from '../test-utils';

describe('BiomimeticStructureNode', () => {
  it('should create BiomimeticStructure', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      inspiration: "bone",
      density: 0.5
    };

    const result = await BiomimeticStructureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.biomimetic).toBeDefined();
  });

  
});