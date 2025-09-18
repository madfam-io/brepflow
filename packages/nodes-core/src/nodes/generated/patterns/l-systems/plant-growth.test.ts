
import { describe, it, expect } from 'vitest';
import { PlantGrowthNode } from './plantgrowth-node';
import { createTestContext } from '../test-utils';

describe('PlantGrowthNode', () => {
  it('should create PlantGrowth', async () => {
    const context = createTestContext();
    const inputs = {
      ground: /* test value */
    };
    const params = {
      species: "fern",
      age: 5
    };

    const result = await PlantGrowthNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.plant).toBeDefined();
  });

  
});