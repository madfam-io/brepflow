
import { describe, it, expect } from 'vitest';
import { PowerMappingNode } from './powermapping.node';
import { createTestContext } from './../../test-utils';

describe('PowerMappingNode', () => {
  it('should create PowerMapping', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null
    };
    const params = {
      material: "acrylic",
      thickness: 3,
      wattage: 60
    };

    const result = await PowerMappingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.powerSettings).toBeDefined();
  });

  
});