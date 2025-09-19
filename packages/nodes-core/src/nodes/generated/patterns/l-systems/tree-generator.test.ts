
import { describe, it, expect } from 'vitest';
import { TreeGeneratorNode } from './treegenerator.node';
import { createTestContext } from './../../test-utils';

describe('TreeGeneratorNode', () => {
  it('should create TreeGenerator', async () => {
    const context = createTestContext();
    const inputs = {
      base: null
    };
    const params = {
      treeType: "oak",
      height: 100,
      branches: 5,
      seed: 0
    };

    const result = await TreeGeneratorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trunk).toBeDefined();
    expect(result.leaves).toBeDefined();
  });

  
});