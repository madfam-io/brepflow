
import { describe, it, expect } from 'vitest';
import { TreeGeneratorNode } from './tree-generator.node';
import { createTestContext } from '../test-utils';

describe('TreeGeneratorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      base: undefined
    } as any;
    const params = {
      treeType: "oak",
      height: 100,
      branches: 5,
      seed: 0
    } as any;

    const result = await TreeGeneratorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
