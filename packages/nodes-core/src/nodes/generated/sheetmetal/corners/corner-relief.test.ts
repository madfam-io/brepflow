
import { describe, it, expect } from 'vitest';
import { CornerReliefNode } from './corner-relief.node';
import { createTestContext } from '../test-utils';

describe('CornerReliefNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      corners: undefined
    } as any;
    const params = {
      reliefType: "circular",
      reliefSize: 5,
      reliefRatio: 0.5
    } as any;

    const result = await CornerReliefNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
