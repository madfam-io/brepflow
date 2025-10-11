
import { describe, it, expect } from 'vitest';
import { SpiralPatternNode } from './spiral-pattern.node';
import { createTestContext } from '../test-utils';

describe('SpiralPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      spiralType: "logarithmic",
      turns: 5,
      growth: 1.2
    } as any;

    const result = await SpiralPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
