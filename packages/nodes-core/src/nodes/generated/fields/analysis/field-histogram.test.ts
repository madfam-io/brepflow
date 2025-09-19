
import { describe, it, expect } from 'vitest';
import { FieldHistogramNode } from './fieldhistogram.node';
import { createTestContext } from './../../test-utils';

describe('FieldHistogramNode', () => {
  it('should create FieldHistogram', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      bins: 20
    };

    const result = await FieldHistogramNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.binCenters).toBeDefined();
    expect(result.binCounts).toBeDefined();
    expect(result.binEdges).toBeDefined();
  });

  
});