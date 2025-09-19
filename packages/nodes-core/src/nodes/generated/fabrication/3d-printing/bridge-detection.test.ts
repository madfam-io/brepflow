
import { describe, it, expect } from 'vitest';
import { BridgeDetectionNode } from './bridgedetection.node';
import { createTestContext } from './../../test-utils';

describe('BridgeDetectionNode', () => {
  it('should create BridgeDetection', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      maxBridge: 5,
      overhangAngle: 45
    };

    const result = await BridgeDetectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bridges).toBeDefined();
    expect(result.overhangs).toBeDefined();
  });

  
});