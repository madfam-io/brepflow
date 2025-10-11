
import { describe, it, expect } from 'vitest';
import { VolumeCalculationNode } from './volume-calculation.node';
import { createTestContext } from '../test-utils';

describe('VolumeCalculationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      solid: undefined
    } as any;
    const params = {
      precision: 0.01,
      density: 1
    } as any;

    const result = await VolumeCalculationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
