
import { describe, it, expect } from 'vitest';
import { ConveyorTrackingNode } from './conveyor-tracking.node';
import { createTestContext } from '../test-utils';

describe('ConveyorTrackingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      objectPositions: undefined
    } as any;
    const params = {
      conveyorSpeed: 100,
      trackingWindow: 500
    } as any;

    const result = await ConveyorTrackingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
