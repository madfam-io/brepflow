
import { describe, it, expect } from 'vitest';
import { UShapedStairNode } from './ushaped-stair.node';
import { createTestContext } from '../test-utils';

describe('UShapedStairNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: undefined
    } as any;
    const params = {
      totalRise: 3000,
      clearance: 100
    } as any;

    const result = await UShapedStairNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
