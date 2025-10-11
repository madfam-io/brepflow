
import { describe, it, expect } from 'vitest';
import { FlangeBearingNode } from './flange-bearing.node';
import { createTestContext } from '../test-utils';

describe('FlangeBearingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      boreDiameter: 12,
      flangeDiameter: 40,
      thickness: 8,
      mountingHoles: 4
    } as any;

    const result = await FlangeBearingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
