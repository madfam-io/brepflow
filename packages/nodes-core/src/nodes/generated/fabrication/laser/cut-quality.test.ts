
import { describe, it, expect } from 'vitest';
import { CutQualityNode } from './cutquality.node';
import { createTestContext } from './../../test-utils';

describe('CutQualityNode', () => {
  it('should create CutQuality', async () => {
    const context = createTestContext();
    const inputs = {
      material: null
    };
    const params = {
      speed: 20,
      power: 80
    };

    const result = await CutQualityNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.edgeQuality).toBeDefined();
    expect(result.heatAffectedZone).toBeDefined();
  });

  
});