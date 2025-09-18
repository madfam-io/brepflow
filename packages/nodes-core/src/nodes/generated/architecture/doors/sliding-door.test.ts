
import { describe, it, expect } from 'vitest';
import { SlidingDoorNode } from './slidingdoor-node';
import { createTestContext } from '../test-utils';

describe('SlidingDoorNode', () => {
  it('should create SlidingDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: /* test value */
    };
    const params = {
      panelCount: 2,
      panelWidth: 900,
      openingPercent: 0
    };

    const result = await SlidingDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.panels).toBeDefined();
    expect(result.track).toBeDefined();
  });

  
});