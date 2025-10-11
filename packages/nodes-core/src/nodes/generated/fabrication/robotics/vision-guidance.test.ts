
import { describe, it, expect } from 'vitest';
import { VisionGuidanceNode } from './vision-guidance.node';
import { createTestContext } from '../test-utils';

describe('VisionGuidanceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      targetFeatures: undefined
    } as any;
    const params = {
      cameraType: "3d",
      patternType: "aruco"
    } as any;

    const result = await VisionGuidanceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
