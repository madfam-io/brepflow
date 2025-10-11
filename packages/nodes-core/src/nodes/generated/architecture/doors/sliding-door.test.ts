
import { describe, it, expect } from 'vitest';
import { SlidingDoorNode } from './sliding-door.node';
import { createTestContext } from '../test-utils';

describe('SlidingDoorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      panelCount: 2,
      panelWidth: 900,
      openingPercent: 0
    } as any;

    const result = await SlidingDoorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
