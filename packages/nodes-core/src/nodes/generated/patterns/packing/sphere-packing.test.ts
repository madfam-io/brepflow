
import { describe, it, expect } from 'vitest';
import { SpherePackingNode } from './sphere-packing.node';
import { createTestContext } from '../test-utils';

describe('SpherePackingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      container: undefined,
      radius: undefined
    } as any;
    const params = {
      packingType: "hexagonal"
    } as any;

    const result = await SpherePackingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
