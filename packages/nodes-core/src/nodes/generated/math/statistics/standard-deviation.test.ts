
import { describe, it, expect } from 'vitest';
import { StandardDeviationNode } from './standarddeviation.node';
import { createTestContext } from './../../test-utils';

describe('StandardDeviationNode', () => {
  it('should create StandardDeviation', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      sample: false
    };

    const result = await StandardDeviationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.stddev).toBeDefined();
  });

  
});