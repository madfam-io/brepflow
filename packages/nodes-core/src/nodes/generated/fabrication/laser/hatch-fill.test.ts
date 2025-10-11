
import { describe, it, expect } from 'vitest';
import { HatchFillNode } from './hatch-fill.node';
import { createTestContext } from '../test-utils';

describe('HatchFillNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      region: undefined
    } as any;
    const params = {
      angle: 45,
      spacing: 1,
      crosshatch: false
    } as any;

    const result = await HatchFillNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
