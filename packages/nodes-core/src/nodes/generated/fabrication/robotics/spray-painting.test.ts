
import { describe, it, expect } from 'vitest';
import { SprayPaintingNode } from './spraypainting.node';
import { createTestContext } from './../../test-utils';

describe('SprayPaintingNode', () => {
  it('should create SprayPainting', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      sprayWidth: 100,
      overlap: 0.5,
      standoffDistance: 200
    };

    const result = await SprayPaintingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sprayPath).toBeDefined();
  });

  
});