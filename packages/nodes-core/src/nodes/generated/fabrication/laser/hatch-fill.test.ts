
import { describe, it, expect } from 'vitest';
import { HatchFillNode } from './hatchfill.node';
import { createTestContext } from './../../test-utils';

describe('HatchFillNode', () => {
  it('should create HatchFill', async () => {
    const context = createTestContext();
    const inputs = {
      region: null
    };
    const params = {
      angle: 45,
      spacing: 1,
      crosshatch: false
    };

    const result = await HatchFillNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.hatchLines).toBeDefined();
  });

  
});