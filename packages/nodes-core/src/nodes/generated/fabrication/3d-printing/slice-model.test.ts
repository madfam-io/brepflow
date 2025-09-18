
import { describe, it, expect } from 'vitest';
import { SliceModelNode } from './slicemodel-node';
import { createTestContext } from '../test-utils';

describe('SliceModelNode', () => {
  it('should create SliceModel', async () => {
    const context = createTestContext();
    const inputs = {
      model: /* test value */
    };
    const params = {
      layerHeight: 0.2,
      infillDensity: 0.2,
      infillPattern: "grid"
    };

    const result = await SliceModelNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.slices).toBeDefined();
    expect(result.infill).toBeDefined();
  });

  
});