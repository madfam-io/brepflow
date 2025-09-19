
import { describe, it, expect } from 'vitest';
import { ContourFlangeNode } from './contourflange.node';
import { createTestContext } from './../../test-utils';

describe('ContourFlangeNode', () => {
  it('should create ContourFlange', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      contour: null
    };
    const params = {
      angle: 90,
      bendRadius: 3,
      flangePosition: "material-inside"
    };

    const result = await ContourFlangeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});