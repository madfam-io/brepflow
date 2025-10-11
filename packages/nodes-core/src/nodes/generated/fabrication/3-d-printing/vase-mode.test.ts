
import { describe, it, expect } from 'vitest';
import { VaseModeNode } from './vase-mode.node';
import { createTestContext } from '../test-utils';

describe('VaseModeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      bottomLayers: 3
    } as any;

    const result = await VaseModeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
