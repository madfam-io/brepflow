
import { describe, it, expect } from 'vitest';
import { FeedsAndSpeedsNode } from './feeds-and-speeds.node';
import { createTestContext } from '../test-utils';

describe('FeedsAndSpeedsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      material: "aluminum",
      toolMaterial: "carbide",
      toolDiameter: 6
    } as any;

    const result = await FeedsAndSpeedsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
