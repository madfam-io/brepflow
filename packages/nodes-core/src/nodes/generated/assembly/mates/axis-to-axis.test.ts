
import { describe, it, expect } from 'vitest';
import { AxisToAxisNode } from './axistoaxis-node';
import { createTestContext } from '../test-utils';

describe('AxisToAxisNode', () => {
  it('should create AxisToAxis', async () => {
    const context = createTestContext();
    const inputs = {
      axis1: /* test value */,
      axis2: /* test value */
    };
    const params = {
      colinear: true,
      offset: 0
    };

    const result = await AxisToAxisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mated).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});