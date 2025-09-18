
import { describe, it, expect } from 'vitest';
import { GeneticOptimizerNode } from './geneticoptimizer-node';
import { createTestContext } from '../test-utils';

describe('GeneticOptimizerNode', () => {
  it('should create GeneticOptimizer', async () => {
    const context = createTestContext();
    const inputs = {
      objectives: null,
      bounds: null
    };
    const params = {
      populationSize: 100,
      generations: 50,
      mutationRate: 0.1,
      crossoverRate: 0.8,
      elitism: 0.1
    };

    const result = await GeneticOptimizerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bestSolution).toBeDefined();
    expect(result.fitness).toBeDefined();
    expect(result.generations).toBeDefined();
    expect(result.convergence).toBeDefined();
  });

  
});