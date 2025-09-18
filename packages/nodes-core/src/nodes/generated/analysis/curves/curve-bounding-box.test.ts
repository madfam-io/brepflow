
import { describe, it, expect } from 'vitest';
import { CurveBoundingBoxNode } from './curveboundingbox-node';
import { createTestContext } from '../test-utils';

describe('CurveBoundingBoxNode', () => {
  it('should create CurveBoundingBox', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      orientation: "axis-aligned",
      showBox: true
    };

    const result = await CurveBoundingBoxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.boundingBox).toBeDefined();
    expect(result.minPoint).toBeDefined();
    expect(result.maxPoint).toBeDefined();
    expect(result.dimensions).toBeDefined();
  });

  
});