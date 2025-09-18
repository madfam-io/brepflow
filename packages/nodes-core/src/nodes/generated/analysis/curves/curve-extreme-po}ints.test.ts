
import { describe, it, expect } from 'vitest';
import { CurveExtremePo}intsNode } from './curveextremepo}ints-node';
import { createTestContext } from '../test-utils';

describe('CurveExtremePo}intsNode', () => {
  it('should create CurveExtremePo}ints', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */
    };
    const params = {
      axis: "all",
      markPoints: true
    };

    const result = await CurveExtremePo}intsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.minPoints).toBeDefined();
    expect(result.maxPoints).toBeDefined();
    expect(result.extremeValues).toBeDefined();
  });

  
});