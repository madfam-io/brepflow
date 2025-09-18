
import { describe, it, expect } from 'vitest';
import { CurbRampNode } from './curbramp-node';
import { createTestContext } from '../test-utils';

describe('CurbRampNode', () => {
  it('should create CurbRamp', async () => {
    const context = createTestContext();
    const inputs = {
      curbLine: /* test value */
    };
    const params = {
      type: "perpendicular",
      flareSlope: 0.1
    };

    const result = await CurbRampNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curbRamp).toBeDefined();
  });

  
});