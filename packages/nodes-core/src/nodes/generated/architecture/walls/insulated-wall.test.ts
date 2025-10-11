
import { describe, it, expect } from 'vitest';
import { InsulatedWallNode } from './insulated-wall.node';
import { createTestContext } from '../test-utils';

describe('InsulatedWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wallCavity: undefined
    } as any;
    const params = {
      insulationType: "batt",
      rValue: 19
    } as any;

    const result = await InsulatedWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
