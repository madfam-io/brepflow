
import { describe, it, expect } from 'vitest';
import { SlotNode } from './slot-node';
import { createTestContext } from '../test-utils';

describe('SlotNode', () => {
  it('should create Slot', async () => {
    const context = createTestContext();
    const inputs = {
      slot: null,
      slider: null
    };
    const params = {
      freeRotation: true
    };

    const result = await SlotNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.slotted).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});