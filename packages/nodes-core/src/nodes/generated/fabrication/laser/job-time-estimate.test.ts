
import { describe, it, expect } from 'vitest';
import { JobTimeEstimateNode } from './jobtimeestimate.node';
import { createTestContext } from './../../test-utils';

describe('JobTimeEstimateNode', () => {
  it('should create JobTimeEstimate', async () => {
    const context = createTestContext();
    const inputs = {
      cuttingPaths: null
    };
    const params = {
      rapidSpeed: 500
    };

    const result = await JobTimeEstimateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.totalTime).toBeDefined();
    expect(result.cuttingTime).toBeDefined();
    expect(result.engravingTime).toBeDefined();
  });

  
});