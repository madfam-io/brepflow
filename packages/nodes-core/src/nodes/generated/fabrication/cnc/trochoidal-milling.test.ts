
import { describe, it, expect } from 'vitest';
import { TrochoidalMillingNode } from './trochoidal-milling.node';
import { createTestContext } from '../test-utils';

describe('TrochoidalMillingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      slot: undefined
    } as any;
    const params = {
      trochoidWidth: 2,
      stepover: 0.3
    } as any;

    const result = await TrochoidalMillingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
