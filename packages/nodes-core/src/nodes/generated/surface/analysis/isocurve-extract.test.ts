
import { describe, it, expect } from 'vitest';
import { IsocurveExtractNode } from './isocurve-extract.node';
import { createTestContext } from '../test-utils';

describe('IsocurveExtractNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      direction: "both",
      count: 10
    } as any;

    const result = await IsocurveExtractNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
