
import { describe, it, expect } from 'vitest';
import { LayerSeparationNode } from './layer-separation.node';
import { createTestContext } from '../test-utils';

describe('LayerSeparationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      drawing: undefined
    } as any;
    const params = {
      separateBy: "color"
    } as any;

    const result = await LayerSeparationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
