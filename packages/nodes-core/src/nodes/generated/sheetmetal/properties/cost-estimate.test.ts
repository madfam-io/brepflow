
import { describe, it, expect } from 'vitest';
import { CostEstimateNode } from './cost-estimate.node';
import { createTestContext } from '../test-utils';

describe('CostEstimateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined
    } as any;
    const params = {
      materialCostPerKg: 2,
      setupCost: 50,
      bendCost: 0.5,
      cutCostPerMeter: 1
    } as any;

    const result = await CostEstimateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
