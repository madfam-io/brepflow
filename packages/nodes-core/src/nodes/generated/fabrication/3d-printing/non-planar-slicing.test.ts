
import { describe, it, expect } from 'vitest';
import { NonPlanarSlicingNode } from './nonplanarslicing-node';
import { createTestContext } from '../test-utils';

describe('NonPlanarSlicingNode', () => {
  it('should create NonPlanarSlicing', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      maxAngle: 30
    };

    const result = await NonPlanarSlicingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.nonPlanarSlices).toBeDefined();
  });

  
});