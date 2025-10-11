
import { describe, it, expect } from 'vitest';
import { PlantGrowthNode } from './plant-growth.node';
import { createTestContext } from '../test-utils';

describe('PlantGrowthNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      ground: undefined
    } as any;
    const params = {
      species: "fern",
      age: 5
    } as any;

    const result = await PlantGrowthNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
