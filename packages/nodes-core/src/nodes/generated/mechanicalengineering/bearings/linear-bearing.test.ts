
import { describe, it, expect } from 'vitest';
import { LinearBearingNode } from './linear-bearing.node';
import { createTestContext } from '../test-utils';

describe('LinearBearingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      shaftDiameter: 8,
      outerDiameter: 15,
      length: 24,
      type: "ball"
    } as any;

    const result = await LinearBearingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
