
import { describe, it, expect } from 'vitest';
import { PowerMappingNode } from './power-mapping.node';
import { createTestContext } from '../test-utils';

describe('PowerMappingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined
    } as any;
    const params = {
      material: "acrylic",
      thickness: 3,
      wattage: 60
    } as any;

    const result = await PowerMappingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
