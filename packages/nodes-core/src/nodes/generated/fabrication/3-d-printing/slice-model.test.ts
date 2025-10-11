
import { describe, it, expect } from 'vitest';
import { SliceModelNode } from './slice-model.node';
import { createTestContext } from '../test-utils';

describe('SliceModelNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      layerHeight: 0.2,
      infillDensity: 0.2,
      infillPattern: "grid"
    } as any;

    const result = await SliceModelNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
