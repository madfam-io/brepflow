
import { describe, it, expect } from 'vitest';
import { SlotNode } from './slot.node';
import { createTestContext } from '../test-utils';

describe('SlotNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      slot: undefined,
      slider: undefined
    } as any;
    const params = {
      freeRotation: true
    } as any;

    const result = await SlotNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
