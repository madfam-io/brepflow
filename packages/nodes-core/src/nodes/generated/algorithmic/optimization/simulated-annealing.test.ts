
import { describe, it, expect } from 'vitest';
import { SimulatedAnnealingNode } from './simulatedannealing-node';
import { createTestContext } from '../test-utils';

describe('SimulatedAnnealingNode', () => {
  it('should create SimulatedAnnealing', async () => {
    const context = createTestContext();
    const inputs = {
      objective: null,
      initialSolution: null
    };
    const params = {
      initialTemp: 1000,
      finalTemp: 0.1,
      coolingRate: 0.95,
      maxIterations: 1000
    };

    const result = await SimulatedAnnealingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bestSolution).toBeDefined();
    expect(result.bestValue).toBeDefined();
    expect(result.temperature).toBeDefined();
    expect(result.values).toBeDefined();
  });

  
});