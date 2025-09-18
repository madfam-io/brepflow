
import { describe, it, expect } from 'vitest';
import { SlotNode } from './slot-node';
import { createTestContext } from '../test-utils';

describe('SlotNode', () => {
  it('should create Slot', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      edge: null,
      position: null
    };
    const params = {
      slotWidth: 20,
      slotDepth: 10,
      clearance: 0.2
    };

    const result = await SlotNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});