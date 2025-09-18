
import { describe, it, expect } from 'vitest';
import { ParticleSwarmOptimizerNode } from './particleswarmoptimizer-node';
import { createTestContext } from '../test-utils';

describe('ParticleSwarmOptimizerNode', () => {
  it('should create ParticleSwarmOptimizer', async () => {
    const context = createTestContext();
    const inputs = {
      objective: /* test value */,
      bounds: /* test value */
    };
    const params = {
      swarmSize: 50,
      iterations: 100,
      inertia: 0.7,
      cognitive: 2,
      social: 2
    };

    const result = await ParticleSwarmOptimizerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.globalBest).toBeDefined();
    expect(result.bestValue).toBeDefined();
    expect(result.swarmHistory).toBeDefined();
  });

  
});