
import { describe, it, expect } from 'vitest';
import { VolumeCalculationNode } from './volumecalculation-node';
import { createTestContext } from '../test-utils';

describe('VolumeCalculationNode', () => {
  it('should create VolumeCalculation', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */
    };
    const params = {
      precision: 0.01,
      density: 1
    };

    const result = await VolumeCalculationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.volume).toBeDefined();
    expect(result.mass).toBeDefined();
    expect(result.centerOfMass).toBeDefined();
    expect(result.inertiaMatrix).toBeDefined();
  });

  
});