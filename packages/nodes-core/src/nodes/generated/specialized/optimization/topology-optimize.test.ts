
import { describe, it, expect } from 'vitest';
import { TopologyOptimizeNode } from './topology-optimize.node';
import { createTestContext } from '../test-utils';

describe('TopologyOptimizeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      designSpace: undefined,
      loads: undefined,
      constraints: undefined
    } as any;
    const params = {
      volumeFraction: 0.3,
      penaltyFactor: 3,
      filterRadius: 2,
      iterations: 100
    } as any;

    const result = await TopologyOptimizeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
