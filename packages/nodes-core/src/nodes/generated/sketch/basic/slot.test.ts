
import { describe, it, expect } from 'vitest';
import { SlotNode } from './slot.node';
import { createTestContext } from '../test-utils';

describe('SlotNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      centerX: 0,
      centerY: 0,
      length: 100,
      width: 20,
      angle: 0
    } as any;

    const result = await SlotNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
