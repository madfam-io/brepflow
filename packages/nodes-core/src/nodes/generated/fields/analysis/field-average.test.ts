
import { describe, it, expect } from 'vitest';
import { FieldAverageNode } from './fieldaverage.node';
import { createTestContext } from './../../test-utils';

describe('FieldAverageNode', () => {
  it('should create FieldAverage', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      sampleCount: 1000
    };

    const result = await FieldAverageNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.average).toBeDefined();
    expect(result.standardDeviation).toBeDefined();
  });

  
});