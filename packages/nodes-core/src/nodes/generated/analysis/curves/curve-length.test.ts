
import { describe, it, expect } from 'vitest';
import { CurveLengthNode } from './curvelength-node';
import { createTestContext } from '../test-utils';

describe('CurveLengthNode', () => {
  it('should create CurveLength', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */
    };
    const params = {
      tolerance: 0.01,
      segments: 100
    };

    const result = await CurveLengthNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.length).toBeDefined();
    expect(result.segmentLengths).toBeDefined();
    expect(result.arcLength).toBeDefined();
  });

  
});