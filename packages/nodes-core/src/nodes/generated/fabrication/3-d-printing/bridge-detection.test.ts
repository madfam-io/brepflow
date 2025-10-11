
import { describe, it, expect } from 'vitest';
import { BridgeDetectionNode } from './bridge-detection.node';
import { createTestContext } from '../test-utils';

describe('BridgeDetectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      maxBridge: 5,
      overhangAngle: 45
    } as any;

    const result = await BridgeDetectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
