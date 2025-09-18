
import { describe, it, expect } from 'vitest';
import { GradientDescentNode } from './gradientdescent-node';
import { createTestContext } from '../test-utils';

describe('GradientDescentNode', () => {
  it('should create GradientDescent', async () => {
    const context = createTestContext();
    const inputs = {
      objective: null,
      initialPoint: null
    };
    const params = {
      learningRate: 0.01,
      maxIterations: 1000,
      tolerance: 0.001,
      momentum: 0.9
    };

    const result = await GradientDescentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.optimumPoint).toBeDefined();
    expect(result.optimumValue).toBeDefined();
    expect(result.trajectory).toBeDefined();
    expect(result.convergence).toBeDefined();
  });

  
});