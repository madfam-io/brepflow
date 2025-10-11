
import { describe, it, expect } from 'vitest';
import { BiomimeticStructureNode } from './biomimetic-structure.node';
import { createTestContext } from '../test-utils';

describe('BiomimeticStructureNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      inspiration: "bone",
      density: 0.5
    } as any;

    const result = await BiomimeticStructureNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
