
import { describe, it, expect } from 'vitest';
import { CostEstimateNode } from './costestimate-node';
import { createTestContext } from '../test-utils';

describe('CostEstimateNode', () => {
  it('should create CostEstimate', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */
    };
    const params = {
      materialCostPerKg: 2,
      setupCost: 50,
      bendCost: 0.5,
      cutCostPerMeter: 1
    };

    const result = await CostEstimateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cost).toBeDefined();
    expect(result.breakdown).toBeDefined();
  });

  
});