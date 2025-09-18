
import { describe, it, expect } from 'vitest';
import { GeneticAlgorithmNode } from './geneticalgorithm-node';
import { createTestContext } from '../test-utils';

describe('GeneticAlgorithmNode', () => {
  it('should create GeneticAlgorithm', async () => {
    const context = createTestContext();
    const inputs = {
      fitness: null
    };
    const params = {
      population: 50,
      generations: 100,
      mutationRate: 0.1
    };

    const result = await GeneticAlgorithmNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.best).toBeDefined();
    expect(result.population).toBeDefined();
  });

  
});