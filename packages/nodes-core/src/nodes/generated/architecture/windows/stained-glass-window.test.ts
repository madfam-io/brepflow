
import { describe, it, expect } from 'vitest';
import { StainedGlassWindowNode } from './stainedglasswindow-node';
import { createTestContext } from '../test-utils';

describe('StainedGlassWindowNode', () => {
  it('should create StainedGlassWindow', async () => {
    const context = createTestContext();
    const inputs = {
      opening: null
    };
    const params = {
      pattern: "geometric",
      leadWidth: 6
    };

    const result = await StainedGlassWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.stainedGlass).toBeDefined();
    expect(result.leadCame).toBeDefined();
  });

  
});