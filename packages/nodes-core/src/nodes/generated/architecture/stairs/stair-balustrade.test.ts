
import { describe, it, expect } from 'vitest';
import { StairBalustradeNode } from './stair-balustrade.node';
import { createTestContext } from '../test-utils';

describe('StairBalustradeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      stairSide: undefined
    } as any;
    const params = {
      style: "vertical",
      spacing: 100
    } as any;

    const result = await StairBalustradeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
