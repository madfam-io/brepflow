
import { describe, it, expect } from 'vitest';
import { TopologyOptimizerNode } from './topologyoptimizer-node';
import { createTestContext } from '../test-utils';

describe('TopologyOptimizerNode', () => {
  it('should create TopologyOptimizer', async () => {
    const context = createTestContext();
    const inputs = {
      designDomain: /* test value */,
      loads: /* test value */,
      supports: /* test value */
    };
    const params = {
      densityElements: 100,
      volumeFraction: 0.5,
      penalization: 3,
      filter: true
    };

    const result = await TopologyOptimizerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.optimizedShape).toBeDefined();
    expect(result.densityField).toBeDefined();
    expect(result.compliance).toBeDefined();
  });

  
});