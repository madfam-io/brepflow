
import { describe, it, expect } from 'vitest';
import { JobTimeEstimateNode } from './job-time-estimate.node';
import { createTestContext } from '../test-utils';

describe('JobTimeEstimateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      cuttingPaths: undefined
    } as any;
    const params = {
      rapidSpeed: 500
    } as any;

    const result = await JobTimeEstimateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
