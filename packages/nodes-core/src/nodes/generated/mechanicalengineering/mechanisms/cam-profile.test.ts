
import { describe, it, expect } from 'vitest';
import { CamProfileNode } from './camprofile.node';
import { createTestContext } from './../../test-utils';

describe('CamProfileNode', () => {
  it('should create CamProfile', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      baseRadius: 30,
      lift: 10,
      profileType: "harmonic",
      dwellAngle: 60
    };

    const result = await CamProfileNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cam).toBeDefined();
    expect(result.profile).toBeDefined();
  });

  
});