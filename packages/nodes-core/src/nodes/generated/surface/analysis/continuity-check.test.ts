
import { describe, it, expect } from 'vitest';
import { ContinuityCheckNode } from './continuitycheck-node';
import { createTestContext } from '../test-utils';

describe('ContinuityCheckNode', () => {
  it('should create ContinuityCheck', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: /* test value */,
      surface2: /* test value */
    };
    const params = {
      checkType: "G1",
      tolerance: 0.01
    };

    const result = await ContinuityCheckNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isContinuous).toBeDefined();
    expect(result.deviations).toBeDefined();
  });

  
});