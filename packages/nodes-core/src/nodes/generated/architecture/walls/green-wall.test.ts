
import { describe, it, expect } from 'vitest';
import { GreenWallNode } from './green-wall.node';
import { createTestContext } from '../test-utils';

describe('GreenWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wallSurface: undefined
    } as any;
    const params = {
      moduleSize: 600,
      irrigationType: "drip"
    } as any;

    const result = await GreenWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
