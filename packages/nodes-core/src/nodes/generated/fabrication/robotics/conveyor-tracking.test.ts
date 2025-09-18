
import { describe, it, expect } from 'vitest';
import { ConveyorTrackingNode } from './conveyortracking-node';
import { createTestContext } from '../test-utils';

describe('ConveyorTrackingNode', () => {
  it('should create ConveyorTracking', async () => {
    const context = createTestContext();
    const inputs = {
      objectPositions: null
    };
    const params = {
      conveyorSpeed: 100,
      trackingWindow: 500
    };

    const result = await ConveyorTrackingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trackingTrajectory).toBeDefined();
  });

  
});