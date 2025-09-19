
import { describe, it, expect } from 'vitest';
import { IsocurveExtractNode } from './isocurveextract.node';
import { createTestContext } from './../../test-utils';

describe('IsocurveExtractNode', () => {
  it('should create IsocurveExtract', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      direction: "both",
      count: 10
    };

    const result = await IsocurveExtractNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isocurves).toBeDefined();
  });

  
});