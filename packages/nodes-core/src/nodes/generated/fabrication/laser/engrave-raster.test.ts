
import { describe, it, expect } from 'vitest';
import { EngraveRasterNode } from './engraveraster-node';
import { createTestContext } from '../test-utils';

describe('EngraveRasterNode', () => {
  it('should create EngraveRaster', async () => {
    const context = createTestContext();
    const inputs = {
      image: /* test value */,
      boundary: /* test value */
    };
    const params = {
      resolution: 300,
      dithering: "floyd-steinberg"
    };

    const result = await EngraveRasterNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rasterData).toBeDefined();
  });

  
});