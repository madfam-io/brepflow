
import { describe, it, expect } from 'vitest';
import { HoneycombStructureNode } from './honeycombstructure-node';
import { createTestContext } from '../test-utils';

describe('HoneycombStructureNode', () => {
  it('should create HoneycombStructure', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      cellSize: 5,
      wallThickness: 0.5,
      fillDensity: 0.3
    };

    const result = await HoneycombStructureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.honeycomb).toBeDefined();
  });

  
});