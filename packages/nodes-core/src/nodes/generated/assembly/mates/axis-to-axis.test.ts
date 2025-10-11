
import { describe, it, expect } from 'vitest';
import { AxisToAxisNode } from './axis-to-axis.node';
import { createTestContext } from '../test-utils';

describe('AxisToAxisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      axis1: undefined,
      axis2: undefined
    } as any;
    const params = {
      colinear: true,
      offset: 0
    } as any;

    const result = await AxisToAxisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
