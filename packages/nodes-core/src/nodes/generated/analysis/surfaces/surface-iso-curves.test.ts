
import { describe, it, expect } from 'vitest';
import { SurfaceIsoCurvesNode } from './surfaceisocurves-node';
import { createTestContext } from '../test-utils';

describe('SurfaceIsoCurvesNode', () => {
  it('should create SurfaceIsoCurves', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      uCount: 10,
      vCount: 10,
      direction: "both"
    };

    const result = await SurfaceIsoCurvesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.uCurves).toBeDefined();
    expect(result.vCurves).toBeDefined();
    expect(result.allCurves).toBeDefined();
  });

  
});