
import { describe, it, expect } from 'vitest';
import { TopologyOptimizeNode } from './topologyoptimize-node';
import { createTestContext } from '../test-utils';

describe('TopologyOptimizeNode', () => {
  it('should create TopologyOptimize', async () => {
    const context = createTestContext();
    const inputs = {
      designSpace: null,
      loads: null,
      constraints: null
    };
    const params = {
      volumeFraction: 0.3,
      penaltyFactor: 3,
      filterRadius: 2,
      iterations: 100
    };

    const result = await TopologyOptimizeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.optimized).toBeDefined();
    expect(result.convergence).toBeDefined();
  });

  
});