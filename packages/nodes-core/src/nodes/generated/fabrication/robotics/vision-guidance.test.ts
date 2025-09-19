
import { describe, it, expect } from 'vitest';
import { VisionGuidanceNode } from './visionguidance.node';
import { createTestContext } from './../../test-utils';

describe('VisionGuidanceNode', () => {
  it('should create VisionGuidance', async () => {
    const context = createTestContext();
    const inputs = {
      targetFeatures: null
    };
    const params = {
      cameraType: "3d",
      patternType: "aruco"
    };

    const result = await VisionGuidanceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.detectedPoses).toBeDefined();
  });

  
});